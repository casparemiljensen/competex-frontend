import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { entityRequest } from '../../models/entityRequest';
import { entityResponse } from '../../models/entityResponse';

@Injectable({
  providedIn: 'root',
})
export class entityService {
  private baseUrl = 'https://competex.schnykjaer.com:22114/api/Entities'; // backend URL

  constructor(private http: HttpClient) {}

  // Fetch competitions
  getEntities(): Observable<entityResponse[]> {
    return this.http
      .get<{ values: entityResponse[] }>(this.baseUrl)
      .pipe(map((response) => response.values));
  }

  //post an entity
  postEntity(entity: entityRequest): Observable<entityResponse> {
    return this.http.post<entityResponse>(this.baseUrl, entity);
  }

  //delete an entity
  deleteEntity(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  //update an entity
  updateEntity(id: string, entity: entityRequest): Observable<entityResponse> {
    return this.http.put<entityResponse>(`${this.baseUrl}/${id}`, entity);
  }
}
