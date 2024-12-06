import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SyncTask } from '../../models/syncTask';

@Injectable({
  providedIn: 'root',
})
export class OfflineQueueService {
  constructor(private http: HttpClient) {}

  // Method to add a task to the offline queue
  addToQueue(url: string, payload: any, params: HttpParams): void {
    console.log('Adding task to queue:', { url, payload, params: params.toString() });

    const request = indexedDB.open('SyncTasksDB', 3);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBRequest).result;
      if (!db.objectStoreNames.contains('syncTasks')) {
        db.createObjectStore('syncTasks', { keyPath: 'id', autoIncrement: true });
      }
    };

    request.onsuccess = (event) => {
      const db = (event.target as IDBRequest).result;
      const transaction = db.transaction('syncTasks', 'readwrite');
      const store = transaction.objectStore('syncTasks');
      const task = { url, body: payload, params: params.toString() };
      store.add(task);

      console.log('Task successfully stored in IndexedDB:', task);
    };

    request.onerror = (event) => {
      console.error('Error saving task to IndexedDB:', event);
    };
  }

  // Method to process all queued requests
  processQueue(): void {
    const request = indexedDB.open('SyncTasksDB', 3);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBRequest).result;
      if (!db.objectStoreNames.contains('syncTasks')) {
        db.createObjectStore('syncTasks', { keyPath: 'id', autoIncrement: true });
      }
    };

    request.onsuccess = (event) => {
      const db = (event.target as IDBRequest).result;
      const transaction = db.transaction('syncTasks', 'readwrite');
      const store = transaction.objectStore('syncTasks');
      const getAllRequest = store.getAll();

      getAllRequest.onsuccess = () => {
        const tasks: SyncTask<any>[] = getAllRequest.result;
        console.log('Retrieved tasks from queue:', tasks);
        if (tasks.length > 0) {
          tasks.forEach((task: SyncTask<any>) => {
            console.log('Syncing task:', task);
            this.http.post(
              task.url,
              JSON.stringify(task.body),
              {
                headers: { 'Content-Type': 'application/json' },
                params: new HttpParams({ fromString: task.params })
              }
            ).subscribe({
              next: () => {
                  console.log('Task synced successfully:', task);
                  this.removeFromQueue(task.id!);
                },
              error: (err) =>  {
                console.error('Failed to sync task:', task, err);
              },
            });
          });
        } else {
          console.log('No tasks to sync');
        }
      };

      getAllRequest.onerror = () => {
        console.error('Error retrieving tasks from IndexedDB.');
      };
    };

    request.onerror = (event) => {
      console.error('Error processing queue:', event);
    };
  }

  // Method to remove a task from the queue after successful sync
  private removeFromQueue(taskId: number): void {
    const request = indexedDB.open('SyncTasksDB', 3); 

    request.onsuccess = (event) => {
      const db = (event.target as IDBRequest).result;
      const transaction = db.transaction('syncTasks', 'readwrite');
      const store = transaction.objectStore('syncTasks');
      store.delete(taskId);
    };

    request.onerror = (event) => {
      console.error('Error removing task from queue:', event);
    };
  }
}
