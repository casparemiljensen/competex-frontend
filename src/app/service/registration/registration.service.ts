import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, forkJoin, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_DOMAIN } from './../apiUrl';
import { RegistrationRespons } from '../../models/registrationRespons';
import { OfflineQueueService } from '../offlineQueue/offline-queue.service';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(
    private http: HttpClient,
    private offlineQueueService: OfflineQueueService
  ) {}

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

  updateRegistration(registration: any): Observable<string> {
    const id = registration.id;
    return this.http.put<string>(`${this.apiUrl}/${id}`, registration);
  }

  postParticipant(participant: any): Observable<string> {
    return this.http.post<string>(this.participantUrl, participant).pipe(
      catchError((error) => {
        console.error('Error posting participant, saving to queue:', error);
        this.offlineQueueService.addToQueue(
          this.participantUrl,
          participant,
          new HttpParams()
        );
        return EMPTY;
      })
    );
  }
}
