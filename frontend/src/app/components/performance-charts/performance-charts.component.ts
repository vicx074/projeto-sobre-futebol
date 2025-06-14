import { Component, Input, OnChanges, SimpleChanges, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeagueStats } from '../../models/player.model';

@Component({
  selector: 'app-performance-charts',
  standalone: true,
  imports: [CommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './performance-charts.component.html',
  styleUrl: './performance-charts.component.scss'
})
export class PerformanceChartsComponent implements OnChanges {
  @Input() starsLeagueStats?: LeagueStats;
  @Input() premierLeagueStats?: LeagueStats;

  // Dados para exibição simplificada
  starsLeagueData: any = {};
  premierLeagueData: any = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes['starsLeagueStats'] && changes['starsLeagueStats'].currentValue) ||
      (changes['premierLeagueStats'] && changes['premierLeagueStats'].currentValue)
    ) {
      this.updateData();
    }
  }

  private updateData(): void {
    if (this.starsLeagueStats) {
      this.starsLeagueData = {
        goalsPerGame: this.starsLeagueStats.goals_shots.goals_per_game.toFixed(2),
        shotAccuracy: this.starsLeagueStats.goals_shots.shot_accuracy.toFixed(1) + '%',
        passesKey: this.starsLeagueStats.playmaking.passes_key,
        dribbleSuccess: this.starsLeagueStats.playmaking.dribble_success_rate.toFixed(1) + '%',
        duelWinRate: this.starsLeagueStats.defensive.duel_win_rate.toFixed(1) + '%',
        rating: this.starsLeagueStats.games.rating?.toFixed(1) || 'N/A'
      };
    }

    if (this.premierLeagueStats) {
      this.premierLeagueData = {
        goalsPerGame: this.premierLeagueStats.goals_shots.goals_per_game.toFixed(2),
        shotAccuracy: this.premierLeagueStats.goals_shots.shot_accuracy.toFixed(1) + '%',
        passesKey: this.premierLeagueStats.playmaking.passes_key,
        dribbleSuccess: this.premierLeagueStats.playmaking.dribble_success_rate.toFixed(1) + '%',
        duelWinRate: this.premierLeagueStats.defensive.duel_win_rate.toFixed(1) + '%',
        rating: this.premierLeagueStats.games.rating?.toFixed(1) || 'N/A'
      };
    }
  }
}
