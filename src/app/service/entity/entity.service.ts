import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Entity } from '../../models/entity';
import { entityResponse } from '../../models/entityResponse';
import { OfflineQueueService } from '../offlineQueue/offline-queue.service';
import { API_DOMAIN } from '../apiUrl';

@Injectable({
  providedIn: 'root',
})
export class entityService {
  private baseUrl = `${API_DOMAIN}api/Entities`; // backend URL

  constructor(
    private http: HttpClient,
    private offlineQueueService: OfflineQueueService
  ) {}

  // Fetch entities
  getEntities(): Observable<entityResponse[]> {
    return this.http
      .get<{ values: entityResponse[] }>(this.baseUrl)
      .pipe(map((response) => response.values));
  }

  // Post an entity (Handles offline and online requests)
  postEntity(entity: Entity): Observable<entityResponse> {
    return this.http.post<entityResponse>(this.baseUrl, entity).pipe(
      catchError((error) => {
        // If the request fails (likely offline), save the request in the queue
        console.error('Error posting entity, saving to queue:', error);

        this.offlineQueueService.addToQueue(this.baseUrl, entity, new HttpParams());
        return EMPTY;
      })
    );
  }  

  // Delete an entity (Handles offline and online requests)
  deleteEntity(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError((error) => {
        // If the request fails (likely offline), save the request in the queue
        console.error('Error deleting entity, saving to queue:', error);
        this.offlineQueueService.addToQueue(`${this.baseUrl}/${id}`, {}, new HttpParams());
        return EMPTY;
      })
    );
  }

  // Update an entity (Handles offline and online requests)
  updateEntity(id: string, entity: Entity): Observable<entityResponse> {
    return this.http
      .put<entityResponse>(`${this.baseUrl}/${id}`, entity)
      .pipe(
        catchError((error) => {
          // If the request fails (likely offline), save the request in the queue
          console.error('Error updating entity, saving to queue:', error);
          this.offlineQueueService.addToQueue(`${this.baseUrl}/${id}`, entity, new HttpParams());
          return EMPTY;
        })
      );
  }
}
