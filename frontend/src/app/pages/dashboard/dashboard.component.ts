import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PlayerProfileComponent } from '../../components/player-profile/player-profile.component';
import { LeagueStatsComponent } from '../../components/league-stats/league-stats.component';
import { PerformanceChartsComponent } from '../../components/performance-charts/performance-charts.component';
import { DetailedStatsComponent } from '../../components/detailed-stats/detailed-stats.component';
import { FootballApiService } from '../../services/football-api.service';
import { Player, LeagueStats } from '../../models/player.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    PlayerProfileComponent,
    LeagueStatsComponent,
    PerformanceChartsComponent,
    DetailedStatsComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  player: Player | null = null;
  starsLeagueStats: LeagueStats | null = null;
  premierLeagueStats: LeagueStats | null = null;
  loading = true;
  error: string | null = null;

  constructor(private apiService: FootballApiService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.error = null;

    this.apiService.getPlayerStats(147).subscribe({
      next: (data) => {
        if (data) {
          this.player = data.player;
          
          // Obter estatísticas por liga
          if (data.leagues && data.leagues['Stars League']) {
            this.starsLeagueStats = data.leagues['Stars League'];
          }
          
          if (data.leagues && data.leagues['Premier League']) {
            this.premierLeagueStats = data.leagues['Premier League'];
          }
          
          this.loading = false;
        } else {
          this.error = 'Dados não encontrados';
          this.loading = false;
        }
      },
      error: (err) => {
        console.error('Erro ao carregar dados:', err);
        this.error = 'Erro ao carregar dados. Por favor, tente novamente.';
        this.loading = false;
      }
    });
  }
}
