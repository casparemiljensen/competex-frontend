import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {
  private competitionsUrl = 'api/competitions';

  constructor(private http: HttpClient) {}

  getCompetitions(): Observable<any[]> {
    return this.http.get<any[]>(this.competitionsUrl);
  }
}
