import { Injectable } from '@angular/core';
import { API_DOMAIN } from '../apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Member } from '../../models/member';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  constructor(private http: HttpClient) {}

  private apiUrl = `${API_DOMAIN}/Members`;

  getMembers(): Observable<Member[]> {
    return this.http
      .get<{ values: Member[] }>(this.apiUrl)
      .pipe(map((response) => response.values));
  }
}
