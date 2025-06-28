import { Player } from './Player';

export type Game = {
  id?: string;
  fase: string;
  player: Partial<Player>;
};