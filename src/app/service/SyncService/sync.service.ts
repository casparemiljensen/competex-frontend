import { Injectable } from '@angular/core';
import { SyncTask } from '../../models/syncTask';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, EMPTY, TimeoutError, throwError } from 'rxjs';
import { catchError, retry, timeout } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SyncService {
  constructor(private http: HttpClient) {}

  tryPostPayload<T>(url: string, payload: T, params: HttpParams): Observable<T> {
    return this.http.post<T>(url, payload, { params }).pipe(
      timeout(5000), 
      retry(2),  
      catchError(err => this.handleError(err, url, payload, params)) 
    );
  }

  private handleError<T>(err: HttpErrorResponse, url: string, payload: T, params: HttpParams): Observable<any> {
    if (this.isNetworkError(err)) {
      this.queueRequest(url, payload, params); 
      return EMPTY; 
    }
    return throwError(err);  
  }

  private queueRequest<T>(url: string, payload: T, params: HttpParams): void {
    const syncTasks = this.getExistingSyncTasks();  // Get current queue from localStorage
    const newTask = new SyncTask(url, payload, params.toString());  // Create a new SyncTask
  
    console.log('Queueing request:', newTask);  // Debugging log
  
    syncTasks.push(newTask);  // Add the new task to the queue
    console.log('Updated sync tasks:', syncTasks);  // Debugging log
  
    localStorage.setItem('syncTasks', JSON.stringify(syncTasks));  // Store updated queue in localStorage
  }
  

  private getExistingSyncTasks(): SyncTask<any>[] {
    return JSON.parse(localStorage.getItem('syncTasks') || '[]');
  }

  private isNetworkError(err: HttpErrorResponse): boolean {
    return !navigator.onLine || err instanceof TimeoutError || err.error instanceof ErrorEvent;
  }

  processQueue(): void {
    const syncTasks = this.getExistingSyncTasks();  

    if (syncTasks.length > 0) {
      syncTasks.forEach(task => {
        this.tryPostPayload(task.url, task.body, new HttpParams({ fromString: task.params })).subscribe({
          next: (response) => {
            console.log('Request retried successfully:', response);
            this.removeFromQueue(task);  
          },
          error: (err) => {
            console.error('Retry failed:', err);  
          },
        });
      });
    }
  }

  private removeFromQueue(task: SyncTask<any>): void {
    const syncTasks = this.getExistingSyncTasks();  
    const index = syncTasks.indexOf(task);
    if (index >= 0) {
      syncTasks.splice(index, 1);  
      localStorage.setItem('syncTasks', JSON.stringify(syncTasks));  
    }
  }
}
