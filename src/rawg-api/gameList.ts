import { get, ResponseSchema } from './api';
import { Game } from '../types/Game.types';

interface Params {
  page?: number,
  page_size?: number,
  search?: string,
  dates?: string,
  ordering?: string,
}

function gameList(params?: Params): Promise<ResponseSchema<Game>> {
  return get<ResponseSchema<Game>>('games', params as Record<string, string>);
}

export { gameList };
