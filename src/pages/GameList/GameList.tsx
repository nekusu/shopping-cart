import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useIsPresent } from 'framer-motion';
import { useScrollTo } from 'framer-motion-scroll-to-hook';
import { Transition, Loading } from '../../components';
import Grid from './components/Grid';
import { Game } from '../../types/Game.types';
import NavBar from '../../components/NavBar';

interface Props {
  games: Game[] | null,
  setGames: (games: Game[] | null) => void,
  loadGames: (value?: string) => Promise<Game[]>,
  cartItems: Game[];
  addToCart: (game: Game) => void;
}

let scrollY = 0;

function GameList(props: Props) {
  const {
    games,
    setGames,
    loadGames,
    cartItems,
    addToCart,
  } = props;
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const scrollTo = useScrollTo();
  const isPresent = useIsPresent();

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
          />
          : <Transition className="NoGames">No games found.</Transition>
        : <Loading />
      }
    </Transition>
  );
}

export default GameList;
