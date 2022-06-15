import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useIsPresent } from 'framer-motion';
import { useScrollTo } from 'framer-motion-scroll-to-hook';
import { useWindowWidth } from '@react-hook/window-size';
import { Transition, Loading } from '../../components';
import Grid from './components/Grid';
import { Game } from '../../types/Game.types';
import NavBar from '../../components/NavBar';

interface Props {
  loadGames: (value?: string) => Promise<Game[]>,
  cartItems: Game[];
  addToCart: (game: Game) => void;
}

const minCardWidth = 330;
let scrollY = 0;

function GameList({ loadGames, cartItems, addToCart }: Props) {
  const [games, setGames] = useState<Game[] | null>(null);
  const [columnsCount, setColumnsCount] = useState(1);
  const windowWidth = useWindowWidth();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const scrollTo = useScrollTo();
  const isPresent = useIsPresent();

  useEffect(() => {
    setColumnsCount(Math.floor(windowWidth / minCardWidth) || 1);
  }, [windowWidth]);
  useEffect(() => {
    !isPresent && ({ scrollY } = window);
  }, [isPresent]);
  useEffect(() => {
    if (location.pathname === '/games') {
      setGames(null);
      if (location.search) {
        ({ scrollY } = window);
        scrollTo();
        (async () => setGames(await loadGames(searchParams.get('search') || '')))();
      } else {
        scrollTo(scrollY);
        (async () => setGames(await loadGames()))();
      }
    }
  }, [searchParams, location]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Transition className="GameList" direction="right">
      <NavBar
        showStoreButton={!!location.search}
        title={searchParams.get('search') || 'Best of All Time'}
      />
      {games
        ? games.length
          ? < Grid
            games={games}
            cartItems={cartItems}
            addToCart={addToCart}
            columnsCount={columnsCount}
          />
          : <Transition className="NoGames">No games found.</Transition>
        : <Loading />
      }
    </Transition>
  );
}

export default GameList;
