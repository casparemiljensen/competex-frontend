import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { API_DOMAIN } from '../apiUrl';
import { CreateRoundRequest, RoundRequest } from '../../models/roundRequest';
import { MatchResponse } from '../../models/matchResponse';
import { RoundResponse } from '../../models/roundResponse';

@Injectable({
  providedIn: 'root',
})
export class RoundService {
  private baseUrl = `${API_DOMAIN}/Rounds`;

  constructor(private http: HttpClient) {}

  // getRounds(): Observable<RoundResponse[]> {
  //   return this.http
  //     .get<{ values: RoundResponse[] }>(`${this.baseUrl}`)
  //     .pipe(map((response) => response.values));
  // }

  createRound(round: RoundRequest): Observable<string> {
    return this.http.post<string>(this.baseUrl, round);
  }

  createMatchesForRound(
    round: CreateRoundRequest
  ): Observable<MatchResponse[]> {
    const url = `${this.baseUrl}/CreateMatchesForRound?competitionId=${round.competitionId}&roundSequenceNo=${round.sequenceNumber}`;
    console.log('Roundasd', round);
    const body =
      round.sequenceNumber > 0
        ? { maxFaults: round.maxFaults, maxMinutes: round.maxMinutes }
        : null;
    console.log('Body', body);

    return this.http
      .post<{ values: MatchResponse[] }>(url, body) // Expecting MatchResponse[] as response
      .pipe(map((response) => response.values));
  }

  getRoundsByCompetitionId(competitionId: string): Observable<RoundResponse[]> {
    return this.http
      .get<{ values: RoundResponse[] }>(
        `${this.baseUrl}/competition/${competitionId}`
      )
      .pipe(map((response) => response.values));
  }

  deleteRoundById(roundId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${roundId}`);
  }
}
