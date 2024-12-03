import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatchResponse } from '../../models/matchResponse';
import { MatchRequest } from '../../models/matchRequest';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  private baseUrl = 'https://competex.schnykjaer.com:22114/api'; // backend URL

  constructor(private http: HttpClient) {}

  //Fetch all matches
  getMatches(): Observable<MatchResponse[]> {
    return this.http
      .get<{ values: MatchResponse[] }>(`${this.baseUrl}/Matches`)
      .pipe(map((response) => response.values));
  }

  updateMatch(match: MatchRequest): Observable<MatchRequest> {
    console.log('Updating match with ID:', match.id); // Log the match ID
    return this.http
      .put<MatchRequest>(`${this.baseUrl}/Matches/${match.id}`, match)
      .pipe(map((response) => response));
  }
}
