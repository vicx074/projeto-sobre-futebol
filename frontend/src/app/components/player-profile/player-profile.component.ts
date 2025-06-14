import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Player } from '../../models/player.model';

@Component({
  selector: 'app-player-profile',
  standalone: true,
  imports: [CommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './player-profile.component.html',
  styleUrl: './player-profile.component.scss'
})
export class PlayerProfileComponent {
  @Input() player!: Player;

  get age(): number {
    return this.player?.age || 0;
  }

  get fullName(): string {
    return `${this.player?.firstname || ''} ${this.player?.lastname || ''}`;
  }

  get birthPlace(): string {
    return 'Rio de Janeiro, Brasil';
  }

  get birthDate(): string {
    return '12 de junho de 1992';
  }
}
