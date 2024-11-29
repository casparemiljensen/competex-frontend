import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventPageService {
  private judgeUrl = 'https://competex.schnykjaer.com:22114/api/Judges';
  private ExpandableTablesUrl = 'api/ExpandableTables';

  constructor(private http: HttpClient) {}

  getJudge(): Observable<any[]> {
    return this.http.get<any[]>(this.judgeUrl);
  }

  getExpandableTables(): Observable<any[]> {
    return this.http.get<any[]>(this.ExpandableTablesUrl);
  }
}
