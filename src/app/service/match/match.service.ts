import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Match } from '../../models/match';
import { Observable } from 'rxjs';
import { API_DOMAIN } from '../apiUrl';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  private baseUrl = `${API_DOMAIN}/Matches`; 

  constructor(private http: HttpClient) {}

  //Fetch all matches
  getMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(`${this.baseUrl}`);
  }
}
