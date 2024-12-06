import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CompetitionType } from '../../models/competitionType';
import { API_DOMAIN } from '../apiUrl';

@Injectable({
  providedIn: 'root',
})
export class CompetitionTypeService {
  private baseUrl = `${API_DOMAIN}/CompetitionType`;

  constructor(private http: HttpClient) {}

  getCompetitionType(): Observable<CompetitionType[]> {
    return this.http
      .get<{ values: CompetitionType[] }>(this.baseUrl)
      .pipe(map((response) => response.values));
  }
}
