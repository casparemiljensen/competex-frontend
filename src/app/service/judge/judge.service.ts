import { Injectable } from '@angular/core';
import { API_DOMAIN } from '../apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Judge } from '../../models/judge';

@Injectable({
  providedIn: 'root',
})
export class JudgeService {
  constructor(private http: HttpClient) {}

  private apiUrl = `${API_DOMAIN}api/Judges`;

  getJudge(): Observable<any[]> {
    return this.http
      .get<{ values: Judge[] }>(this.apiUrl)
      .pipe(map((response) => response.values));
  }
}
