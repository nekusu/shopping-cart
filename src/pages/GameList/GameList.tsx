import { useEffect, useState } from 'react';
import { LayoutGroup } from 'framer-motion';
import { useWindowWidth } from '@react-hook/window-size';
import { Transition } from '../../components';
import { Game } from '../../types/Game.types';
import GameCard from './components/GameCard';

interface Props {
  games: Game[],
}

function GameList(props: Props) {
  const { games } = props;
  const windowWidth = useWindowWidth();
  const [columns, setColumns] = useState(0);
  const gamesPerColumn = Math.ceil(games.length / columns);

  useEffect(() => {
    setColumns(Math.floor(windowWidth / 330) || 1);
  }, [windowWidth]);

  return (
    <Transition className="GameList" direction="right">
      <h2>Latest Games</h2>
      <div className="Grid">
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
                  <GameCard key={game.id} {...game} />
                ))}
              </div>
            );
          })}
        </LayoutGroup>
      </div>
    </Transition>
  );
}

export default GameList;
