const api = {
  url: 'https://api.rawg.io/api/',
  key: '2aa8dadc5e564d299ec1818bf9a9c379',
};

interface ResponseSchema<T> {
  count: number,
  next: string,
  previous: string,
  results: T[],
}

async function get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
  const searchParams = new URLSearchParams(params);
  const response = await fetch(`${api.url}${endpoint}?${searchParams}&key=${api.key}`);
  if (!response.ok) throw new Error(response.statusText);
  const data = await response.json();
  return data;
}

export type { ResponseSchema };
export { get };
