import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { API_DOMAIN } from './../apiUrl'
import { RegistrationRespons } from '../../models/registrationRespons';


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  
  constructor(private http: HttpClient) { }

  private apiUrl = `${API_DOMAIN}/Registration`;

  getRegistration(): Observable<RegistrationRespons[]> {
    return this.http.get<RegistrationRespons[]>(this.apiUrl);
  }

  getRegistrationById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getRegistrationBySearch(compitionId: string): Observable<{ values: RegistrationRespons[] }> {
    const body = ({ "CompetitionId": compitionId });
    const headers = { 'Content-Type': 'application/json', Accept: '*/*' };
    console.log('Body:', body);
    return this.http.post<{ values: RegistrationRespons[] }>(
      `${this.apiUrl}/search`,
      body,
      { headers }
    );
  }
}
