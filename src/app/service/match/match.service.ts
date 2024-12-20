import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatchResponse } from '../../models/matchResponse';
import { MatchRequest } from '../../models/matchRequest';
import { Observable, map } from 'rxjs';
import { API_DOMAIN } from '../apiUrl';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  private baseUrl = `${API_DOMAIN}/Matches`;

  constructor(private http: HttpClient) {}

  //Fetch all matches
  getMatches(): Observable<MatchResponse[]> {
    return this.http
      .get<{ values: MatchResponse[] }>(`${this.baseUrl}`)
      .pipe(map((response) => response.values));
  }

  updateMatch(match: MatchRequest): Observable<MatchRequest> {
    console.log('Updating match with ID:', match.id); // Log the match ID
    return this.http
      .put<MatchRequest>(`${this.baseUrl}/${match.id}`, match)
      .pipe(map((response) => response));
  }

  getMatchesByRoundId(roundId: string): Observable<MatchResponse[]> {
    return this.http
      .get<{ item2: MatchResponse[] }>(`${this.baseUrl}/round/${roundId}`)
      .pipe(map((response) => response.item2));
  }
}
