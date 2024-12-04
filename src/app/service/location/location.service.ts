import { Injectable } from '@angular/core';
import { API_DOMAIN } from '../apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Location } from '../../models/location';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private http: HttpClient) {}

  private apiUrl = `${API_DOMAIN}api/Locations`;

  getLocation(): Observable<any[]> {
    return this.http
      .get<{ values: Location[] }>(this.apiUrl)
      .pipe(map((response) => response.values));
  }
}
