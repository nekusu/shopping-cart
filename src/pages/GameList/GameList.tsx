import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, useIsPresent } from 'framer-motion';
import { useScrollTo } from 'framer-motion-scroll-to-hook';
import { RiArrowLeftLine } from 'react-icons/ri';
import { Transition, Button, Loading } from '../../components';
import Grid from './components/Grid';
import { Game } from '../../types/Game.types';

interface Props {
  games: Game[],
  loadGames: (value: string) => Promise<Game[]>,
  cartItems: Game[];
  addToCart: (game: Game) => void;
}

let scrollY = 0;

function GameList(props: Props) {
  const {
    loadGames,
    cartItems,
    addToCart,
  } = props;
  const [games, setGames] = useState(props.games);
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const scrollTo = useScrollTo();
  const isPresent = useIsPresent();

  useEffect(() => setIsLoading(true), []);
  useEffect(() => {
    !isPresent && ({ scrollY } = window);
  }, [isPresent]);
  useEffect(() => {
    if (props.games.length && !searchParams.get('search')) {
      setGames(props.games);
      setIsLoading(false);
      scrollTo(scrollY);
    }
  }, [props.games, searchParams]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    const searchValue = searchParams.get('search') || '';
    if (searchValue) {
      ({ scrollY } = window);
      scrollTo();
      setIsLoading(true);
      (async () => {
        setGames(await loadGames(searchValue));
        setIsLoading(false);
      })();
    }
  }, [searchParams]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Transition className="GameList" direction="right">
      <nav>
        {searchParams.get('search') && (
          <Transition direction="left">
            <Button
              className="Store"
              handleClick={() => navigate('/games')}
            >
              <RiArrowLeftLine /> Store
            </Button>
          </Transition>
        )}
        <motion.h2 layout>
          {searchParams.get('search') || 'Best of All Time'}
        </motion.h2>
      </nav>
      {isLoading
        ? <Loading />
        : <Grid
          games={games}
          cartItems={cartItems}
          addToCart={addToCart}
        />
      }
    </Transition>
  );
}

export default GameList;
