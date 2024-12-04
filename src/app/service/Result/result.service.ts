import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_DOMAIN } from '../apiUrl';

@Injectable({
  providedIn: 'root',
})
export class ResultService {
  private apiUrl = `${API_DOMAIN}api/Judges`;

  constructor(private http: HttpClient) {}

  getResult(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
