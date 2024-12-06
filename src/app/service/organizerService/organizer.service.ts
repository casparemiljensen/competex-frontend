import { Injectable } from '@angular/core';
import { API_DOMAIN } from '../apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Member } from '../../models/member';

@Injectable({
  providedIn: 'root',
})
export class OrganizerService {
  constructor(private http: HttpClient) {}

  private apiUrl = `${API_DOMAIN}api/Members`; //Change to Club when DTO is created.

  getOrganizer(): Observable<any[]> {
    return this.http
      .get<{ values: Member[] }>(this.apiUrl)
      .pipe(map((response) => response.values));
  }
}
