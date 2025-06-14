import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeagueStats } from '../../models/player.model';

@Component({
  selector: 'app-league-stats',
  standalone: true,
  imports: [CommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './league-stats.component.html',
  styleUrl: './league-stats.component.scss'
})
export class LeagueStatsComponent {
  @Input() leagueStats!: LeagueStats;
  @Input() leagueName: string = '';
  @Input() leagueCountry: string = '';
  @Input() leagueFlag: string = '';
  @Input() leagueLogo: string = '';
}
