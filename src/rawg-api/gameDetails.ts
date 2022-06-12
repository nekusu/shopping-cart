import { get } from './api';
import { Game } from '../types/Game.types';

interface Params {
  id: number,
}

function gameDetails(params: Params): Promise<Game> {
  return get<Game>(`games/${params.id}`);
}

export { gameDetails };
