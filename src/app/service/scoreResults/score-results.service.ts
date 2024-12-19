import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { API_DOMAIN } from './../apiUrl';
import { ScoreResultsResponse } from '../../models/scoreResultsRespons';
import { MatchResponse } from '../../models/matchResponse';

@Injectable({
  providedIn: 'root',
})
export class ScoreResultsService {
  constructor(private http: HttpClient) {}

  private apiUrl = `${API_DOMAIN}/ScoreResults`;
  private scoreUrl = `${API_DOMAIN}/Scores/getResults`;

  getScoreResults(): Observable<ScoreResultsResponse[]> {
    return this.http.get<ScoreResultsResponse[]>(this.apiUrl);
  }

  getScoreResultsById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getResultsByIds(compitionIds: string[]): Observable<any[]> {
    const requests = compitionIds.map((id) => this.getResult(id));
    console.log('Requests:', requests);
    return forkJoin(requests);
  }

  getResult(compitionId: string): Observable<{ values: MatchResponse[] }> {
    return this.http.get<{ values: MatchResponse[] }>(
      `${this.scoreUrl}/${compitionId}`
    );
  }
}
