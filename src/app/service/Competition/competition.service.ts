import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CompetitionRequest } from '../../models/competitionRequest';
import { CompetitionResponse } from '../../models/competitionResponse';
import { API_DOMAIN } from '../apiUrl';

@Injectable({
  providedIn: 'root',
})
export class CompetitionService {
  private baseUrl = `${API_DOMAIN}api/Competitions`; // backend URL

  constructor(private http: HttpClient) {}

  // Fetch competitions
  getCompetitions(): Observable<CompetitionResponse[]> {
    return this.http
      .get<{ values: CompetitionResponse[] }>(this.baseUrl)
      .pipe(map((response) => response.values));
  }

  // Fetch a single competition by ID
  getCompetitionById(id: string): Observable<CompetitionResponse> {
    return this.http.get<CompetitionResponse>(`${this.baseUrl}/${id}`);
  }
}
