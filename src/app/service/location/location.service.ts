import { Injectable } from '@angular/core';
import { API_DOMAIN } from '../apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Location } from '../../models/location';
import { Field } from '../../models/field';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private http: HttpClient) {}

  private apiUrl = `${API_DOMAIN}/Locations`;
  private fieldUrl = `${API_DOMAIN}/Fields`;

  getLocation(): Observable<any[]> {
    return this.http
      .get<{ values: Location[] }>(this.apiUrl)
      .pipe(map((response) => response.values));
  }

  getFields(): Observable<Field[]> {
    return this.http
      .get<{ values: Field[] }>(this.fieldUrl)
      .pipe(map((response) => response.values));
  }
}
