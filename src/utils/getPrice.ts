import { Game } from '../types/Game.types';

function getPrice(game: Game) {
  const { released } = game;
  const isIndie = !!game.genres.find((g) => g.name === 'Indie');
  const minPrice = 2;
  const releaseYear = new Date(released).getFullYear();
  const currentYear = new Date().getFullYear();
  const yearsDifference = currentYear - releaseYear;
  let discountPerYear = isIndie ? 0.3 : 0.375;
  let newPrice = isIndie ? 30 : 70;
  for (let i = 0; i < yearsDifference; i++) {
    newPrice *= 1 - discountPerYear;
    discountPerYear -= 0.02;
  }
  newPrice = Math.ceil(newPrice);
  newPrice = newPrice < minPrice ? minPrice : newPrice;
  return newPrice - 0.01;
}

export default getPrice;
