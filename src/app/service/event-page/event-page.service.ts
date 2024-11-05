import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventPageService {
  private judgeUrl = 'api/judge';

  constructor(private http: HttpClient) {}

  getJudge(): Observable<any[]> {
    return this.http.get<any[]>(this.judgeUrl);
  }
}
