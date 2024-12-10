import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { API_DOMAIN } from '../apiUrl';
import { CreateRoundRequest, RoundRequest } from '../../models/roundRequest';
import { MatchResponse } from '../../models/matchResponse';

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

  createMatchesForRound(
    round: CreateRoundRequest
  ): Observable<MatchResponse[]> {
    const url = `${this.baseUrl}/CreateMatchesForRound?competitionId=${round.competitionId}&roundSequenceNo=${round.sequenceNumber}`;
    const body =
      round.sequenceNumber > 0 && round.maxFaults && round.maxMinutes
        ? { maxFaults: round.maxFaults, maxMinutes: round.maxMinutes }
        : null;

    return this.http
      .post<{ values: MatchResponse[] }>(url, body) // Expecting MatchResponse[] as response
      .pipe(map((response) => response.values));
  }
}
