import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { SyncTask } from '../../models/syncTask'; // Make sure to import the SyncTask class

@Injectable({
  providedIn: 'root',
})
export class OfflineQueueService {
  constructor(private http: HttpClient) {}

  // Method to add a task to the offline queue
  addToQueue(url: string, payload: any, params: HttpParams): void {
    const request = indexedDB.open('SyncTasksDB', 1);

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
      store.add({ url, payload, params });
    };

    request.onerror = (event) => {
      console.error('Error saving task to IndexedDB:', event);
    };
  }

  // Method to process all queued requests
  processQueue(): void {
    const request = indexedDB.open('SyncTasksDB', 1);

    request.onsuccess = (event) => {
      const db = (event.target as IDBRequest).result;
      const transaction = db.transaction('syncTasks', 'readwrite');
      const store = transaction.objectStore('syncTasks');
      const getAllRequest = store.getAll();

      getAllRequest.onsuccess = () => {
        const tasks: SyncTask<any>[] = getAllRequest.result; // Explicitly type the tasks array
        if (tasks.length > 0) {
          tasks.forEach((task: SyncTask<any>) => { // Specify the type of task here
            this.http
              .post(task.url, task.body, { params: new HttpParams({ fromString: task.params }) })
              .subscribe({
                next: () => this.removeFromQueue(task.id!),
                error: (err) => console.error('Failed to sync task:', err),
              });
          });
        }
      };
    };

    request.onerror = (event) => {
      console.error('Error processing queue:', event);
    };
  }

  // Method to remove a task from the queue after successful sync
  private removeFromQueue(taskId: number): void {
    const request = indexedDB.open('SyncTasksDB', 1);

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
