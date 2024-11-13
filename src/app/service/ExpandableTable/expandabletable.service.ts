import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpandableTableService {
  private ExpandableTablesUrl = 'api/ExpandableTables';

  constructor(private http: HttpClient) {}

  getExpandableTables(): Observable<any[]> {
    return this.http.get<any[]>(this.ExpandableTablesUrl);
  }
}
