import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_DOMAIN } from '../apiUrl';
import { Observable } from 'rxjs';
import { ScoreRequest } from '../../models/scoreRequest';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  private baseUrl = `${API_DOMAIN}/Scores`;

  constructor(private http: HttpClient) {}

  createScore(score: ScoreRequest): Observable<ScoreRequest> {
    return this.http.post<ScoreRequest>(`${this.baseUrl}`, score);
  }
}
