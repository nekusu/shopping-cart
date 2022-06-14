import { get, ResponseSchema } from './api';

type Screenshot = {
  id: number,
  image: string,
}

interface Params {
  id: number,
}

function gameScreenshots(params: Params): Promise<ResponseSchema<Screenshot>> {
  return get<ResponseSchema<Screenshot>>(`games/${params.id}/screenshots`);
}

export { gameScreenshots };
