export interface Player {
  id: number;
  name: string;
  firstname: string;
  lastname: string;
  age: number;
  nationality: string;
  height: string;
  weight: string;
  photo: string;
  birth_date: string;
  birth_place: string;
  birth_country: string;
}

export interface League {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
}

export interface Team {
  id: number;
  name: string;
  logo: string;
}

export interface Games {
  appearences: number;
  lineups: number;
  minutes: number;
  position: string;
  rating: number | null;
}

export interface GoalsShots {
  goals: number;
  assists: number;
  shots_total: number;
  shots_on: number;
  goals_per_game: number;
  shot_accuracy: number;
}

export interface Playmaking {
  passes_total: number;
  passes_key: number;
  dribbles_attempts: number;
  dribbles_success: number;
  dribble_success_rate: number;
}

export interface Defensive {
  duels_total: number;
  duels_won: number;
  duel_win_rate: number;
  tackles: number;
  blocks: number;
  interceptions: number;
}

export interface Cards {
  yellow: number;
  red: number;
}

export interface LeagueStats {
  league: League;
  team: Team;
  games: Games;
  goals_shots: GoalsShots;
  playmaking: Playmaking;
  defensive: Defensive;
  cards: Cards;
}

export interface PlayerStats {
  player: Player;
  stats: LeagueStats;
}

export interface PlayerStatsResponse {
  player: Player;
  leagues: {
    stars_league: LeagueStats;
    premier_league: LeagueStats;
  };
} 