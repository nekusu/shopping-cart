import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RiArrowLeftLine } from 'react-icons/ri';
import { Transition, Button, Loading } from '../../components';
import Grid from './components/Grid';
import { Game } from '../../types/Game.types';

interface Props {
  games: Game[],
  loadGames: (value: string) => Promise<Game[]>,
}

function GameList(props: Props) {
  const { loadGames } = props;
  const [games, setGames] = useState(props.games);
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const searchParam = searchParams.get('search') || '';
    setIsLoading(true);
    if (searchParam) {
      (async () => {
        setGames(await loadGames(searchParam));
        setIsLoading(false);
      })();
    } else if (props.games.length) {
      setGames(props.games);
      setIsLoading(false);
    }
  }, [loadGames, props.games, searchParams]);

  return (
    <Transition className="GameList" direction="right">
      <nav>
        {searchParams.get('search') && (
          <Transition direction="left">
            <Link to="/games">
              <Button className="Store"><RiArrowLeftLine /> Store</Button>
            </Link>
          </Transition>
        )}
        <motion.h2 layout>
          {searchParams.get('search') || 'Best of All Time'}
        </motion.h2>
      </nav>
      {isLoading ? <Loading /> : <Grid games={games} />}
    </Transition>
  );
}

export default GameList;
