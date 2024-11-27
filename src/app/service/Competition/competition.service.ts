import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompetitionRequest } from '../../models/competitionRequest';
import { CompetitionResponse } from '../../models/competitionResponse';

@Injectable({
  providedIn: 'root',
})
export class CompetitionService {
  private baseUrl = 'https://competex.schnykjaer.com:22114/api/Competitions'; // backend URL

  constructor(private http: HttpClient) {}

  // Fetch competitions
  getCompetitions(): Observable<CompetitionResponse[]> {
    return this.http.get<CompetitionResponse[]>(this.baseUrl);
  }

  // Fetch a single competition by ID
  getCompetitionById(id: string): Observable<CompetitionResponse> {
    return this.http.get<CompetitionResponse>(`${this.baseUrl}/${id}`);
  }
}
