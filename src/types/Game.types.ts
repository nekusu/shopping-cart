interface Game {
  id: number,
  slug: string,
  name: string,
  price: number,
  ratings_count: number,
  description_raw: string,
  website: string,
  released: string,
  background_image: string,
  parent_platforms: {
    platform: {
      id: number,
      slug: string,
      name: string,
    }
  }[],
  platforms: {
    platform: {
      id: number,
      slug: string,
      name: string,
    }
  }[],
  genres: {
    id: number,
    slug: string,
    name: string,
  }[],
  short_screenshots: {
    id: number,
    image: string,
  }[],
}

export type { Game };
