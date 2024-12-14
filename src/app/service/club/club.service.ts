import { Injectable } from '@angular/core';
import { API_DOMAIN } from '../apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Club } from '../../models/club';

@Injectable({
  providedIn: 'root',
})
export class OrganizerService {
  constructor(private http: HttpClient) {}

  private apiUrl = `${API_DOMAIN}/Club`; //Change to Club when DTO is created.

  getOrganizer(): Observable<Club[]> {
    return this.http
      .get<{ values: Club[] }>(this.apiUrl)
      .pipe(map((response) => response.values));
  }
}
