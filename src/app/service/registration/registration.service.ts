import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { API_DOMAIN } from './../apiUrl';
import { RegistrationRespons } from '../../models/registrationRespons';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(private http: HttpClient) {}

  private apiUrl = `${API_DOMAIN}/Registration`;
  private participantUrl = `${API_DOMAIN}/Participants`;

  getRegistration(): Observable<RegistrationRespons[]> {
    return this.http.get<RegistrationRespons[]>(this.apiUrl);
  }

  getRegistrationById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getRegistrationBySearch(
    compitionId: string
  ): Observable<{ values: RegistrationRespons[] }> {
    const body = JSON.stringify({ CompetitionId: compitionId });
    const headers = { 'Content-Type': 'application/json', Accept: '*/*' };
    console.log('Body:', body);
    return this.http.post<{ values: RegistrationRespons[] }>(
      `${this.apiUrl}/search`,
      body,
      { headers }
    );
  }
  postRegistration(registration: any): Observable<string> {
    return this.http.post<string>(this.apiUrl, registration);
  }

  postParticipant(participant: any): Observable<string> {
    return this.http.post<string>(this.participantUrl, participant);
  }
}
