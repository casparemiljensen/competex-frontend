import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_DOMAIN } from '../apiUrl';

@Injectable({
  providedIn: 'root'
})
export class EventPageService {
  private judgeUrl = `${API_DOMAIN}api/Judges`;
  private ExpandableTablesUrl = 'api/ExpandableTables';

  constructor(private http: HttpClient) {}

  getJudge(): Observable<any[]> {
    return this.http.get<any[]>(this.judgeUrl);
  }

  getExpandableTables(): Observable<any[]> {
    return this.http.get<any[]>(this.ExpandableTablesUrl);
  }
}
