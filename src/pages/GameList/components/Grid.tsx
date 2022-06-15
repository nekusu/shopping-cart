import { memo } from 'react';
import { Transition } from '../../../components';
import GameCard from './GameCard';
import { Game } from '../../../types/Game.types';

interface Props {
  games: Game[],
  cartItems: Game[];
  addToCart: (game: Game) => void;
  columnsCount: number;
}

function Grid({ games, cartItems, addToCart, columnsCount }: Props) {
  const gamesPerColumn = Math.ceil(games.length / columnsCount);
  const columns = Array(columnsCount).fill(null).map((_, index) => {
    const gamesToDisplay = [];
    for (let i = 0; i < gamesPerColumn; i++) {
      const gameIndex = i * columnsCount + index;
      if (gameIndex < games.length) {
        gamesToDisplay.push(games[gameIndex]);
      }
    }
    return gamesToDisplay;
  });

  return (
    <Transition className="Grid">
      <>
        {columns.map((column, index) => (
          <div key={`column-${index}`} className="Column">
            {column.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                cartItems={cartItems}
                addToCart={addToCart}
              />
            ))}
          </div>
        ))}
      </>
    </Transition>
  );
}

export default memo(Grid);
