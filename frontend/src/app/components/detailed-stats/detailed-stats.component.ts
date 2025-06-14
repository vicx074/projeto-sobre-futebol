import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeagueStats } from '../../models/player.model';

@Component({
  selector: 'app-detailed-stats',
  standalone: true,
  imports: [CommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './detailed-stats.component.html',
  styleUrl: './detailed-stats.component.scss'
})
export class DetailedStatsComponent {
  @Input() starsLeagueStats?: LeagueStats;
  @Input() premierLeagueStats?: LeagueStats;

  // Método para calcular a diferença percentual entre duas estatísticas
  calculateDifference(stat1: number, stat2: number): number {
    if (stat2 === 0) return stat1 > 0 ? 100 : 0;
    return ((stat1 - stat2) / stat2) * 100;
  }

  // Método para determinar se uma diferença é positiva, negativa ou neutra
  getDifferenceClass(diff: number): string {
    if (diff > 5) return 'positive';
    if (diff < -5) return 'negative';
    return 'neutral';
  }
}
