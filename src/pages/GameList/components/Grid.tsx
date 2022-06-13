import { useEffect, useState } from 'react';
import { LayoutGroup } from 'framer-motion';
import { useWindowWidth } from '@react-hook/window-size';
import { Transition } from '../../../components';
import GameCard from './GameCard';
import { Game } from '../../../types/Game.types';

interface Props {
  games: Game[],
  cartItems: Game[];
  addToCart: (game: Game) => void;
}

const minCardWidth = 330;

function Grid(props: Props) {
  const {
    games,
    cartItems,
    addToCart,
  } = props;
  const [columns, setColumns] = useState(1);
  const windowWidth = useWindowWidth();
  const gamesPerColumn = Math.ceil(games.length / columns);

  useEffect(() => {
    setColumns(Math.floor(windowWidth / minCardWidth) || 1);
  }, [windowWidth]);

  return (
    <Transition className="Grid" direction="right">
      <LayoutGroup>
        {Array(columns).fill(null).map((_, index) => {
          const gamesToDisplay = [];
          for (let i = 0; i < gamesPerColumn; i++) {
            const gameIndex = i * columns + index;
            if (gameIndex < games.length) {
              gamesToDisplay.push(games[gameIndex]);
            }
          }
          return (
            <div key={`column-${index}`} className="Column">
              {gamesToDisplay.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  cartItems={cartItems}
                  addToCart={addToCart}
                />
              ))}
            </div>
          );
        })}
      </LayoutGroup>
    </Transition>
  );
}

export default Grid;
