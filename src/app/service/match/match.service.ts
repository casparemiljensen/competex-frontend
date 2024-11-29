import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Match } from '../../models/match';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  private baseUrl = 'https://competex.schnykjaer.com:22114/api'; // backend URL

  constructor(private http: HttpClient) {}

  //Fetch all matches
  getMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(`${this.baseUrl}/Matches`);
  }
}
