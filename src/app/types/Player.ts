import { Game } from './Game';

export type Player = {
  id?: string;
  nome: string;
  game: Partial<Game>;
};