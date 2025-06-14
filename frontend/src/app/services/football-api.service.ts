import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FootballApiService {
  private apiUrl = environment.production 
    ? '/api' 
    : 'http://localhost:5000/api';
  private http = inject(HttpClient);

  // Buscar dados básicos de comparação do Coutinho
  getCoutinhoComparison(): Observable<any> {
    return this.http.get(`${this.apiUrl}/coutinho/comparacao`);
  }

  // Buscar estatísticas detalhadas de um jogador
  getPlayerStats(playerId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/player/${playerId}/stats`);
  }
}
