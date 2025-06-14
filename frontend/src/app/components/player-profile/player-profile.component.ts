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
    if (this.player && 'birth' in this.player && this.player.birth) {
      const birth = this.player.birth as any;
      return birth.place ? `${birth.place}, ${birth.country}` : birth.country || '';
    }
    return '';
  }

  get birthDate(): string {
    if (this.player && 'birth' in this.player && this.player.birth) {
      const birth = this.player.birth as any;
      if (birth.date) {
        const date = new Date(birth.date);
        return date.toLocaleDateString();
      }
    }
    return '';
  }
}
