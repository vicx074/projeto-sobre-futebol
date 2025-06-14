import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl || '/api';

  constructor(private http: HttpClient) { }

  getPlayerComparison(): Observable<any> {
    return this.http.get(`${this.apiUrl}/coutinho/comparacao`);
  }

  getPlayerStats(playerId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/player/${playerId}/stats`);
  }
} 