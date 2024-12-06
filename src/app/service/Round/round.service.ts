import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { API_DOMAIN } from '../apiUrl';
import { RoundRequest } from '../../models/roundRequest';

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

  createMatchesForRound(round: RoundRequest): Observable<RoundRequest> {
    return this.http
      .post<RoundRequest>(`${this.baseUrl}`, round)
      .pipe(map((response) => response));
  }
}
