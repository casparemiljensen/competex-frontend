import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { API_DOMAIN } from './../apiUrl'
import { ScoreResultsResponse } from '../../models/scoreResultsRespons';

@Injectable({
  providedIn: 'root'
})
export class ScoreResultsService {
  
  constructor(private http: HttpClient) { }

  private apiUrl = `${API_DOMAIN}/ScoreResults`;

  getScoreResults(): Observable<ScoreResultsResponse[]> {
    return this.http.get<ScoreResultsResponse[]>(this.apiUrl);
  }

  getScoreResultsById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getResultsByIds(compitionIds: string[]): Observable<any[]> {
    const requests = compitionIds.map(id => this.getResultBySearch(id));
    return forkJoin(requests);
  }

  getResultBySearch(compitionId: string): Observable<{ values: ScoreResultsResponse[]; pageInfo: any }> {
    const body = JSON.stringify({ "CompetitionId": compitionId });
    const headers = { 'Content-Type': 'application/json', Accept: '*/*' };

    return this.http.post<{ values: ScoreResultsResponse[]; pageInfo: any }>(
      `${this.apiUrl}/search`,
      body,
      { headers }
    );
  }
}
