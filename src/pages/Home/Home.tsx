import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScrollTo } from 'framer-motion-scroll-to-hook';
import { RiArrowRightLine } from 'react-icons/ri';
import {
  Footer,
  Transition,
  Button,
  Loading,
} from '../../components';
import { Game } from '../../types/Game.types';
import GameCard from './components/GameCard';

interface Props {
  loadGames: (value?: string) => Promise<Game[]>,
}

const cardDuration = 10;
const cycleArray = (array: unknown[]) => {
  const newArray = [...array];
  newArray.push(newArray.shift());
  return newArray;
};
const getRandomItems = (items: unknown[], length: number) => {
  const randomItems = new Set();
  while (randomItems.size < length) {
    const index = Math.floor(Math.random() * items.length);
    randomItems.add(items[index]);
  }
  return [...randomItems];
};

function Home({ loadGames }: Props) {
  const [games, setGames] = useState<Game[]>();
  const scrollTo = useScrollTo();
  const navigate = useNavigate();
  const navigateToStore = () => navigate('/games');

  useEffect(() => {
    let interval: NodeJS.Timer;
    (async () => {
      const loadedGames = await loadGames();
      const games = getRandomItems(loadedGames, 4) as Game[];
      setGames(games);
      interval = setInterval(() => {
        setGames(games => cycleArray(games as Game[]) as Game[]);
      }, cardDuration * 1000);
    })();
    scrollTo();
    return () => clearInterval(interval);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Transition className="Home" direction="left">
      {games
        ? < Transition className="Grid">
          {games.map(({ id, name, background_image }, i) => (
            <GameCard
              key={id}
              id={id}
              name={name}
              backgroundImage={background_image}
              duration={cardDuration}
              big={i === 0}
            />
          ))}
          <Button
            className="Store"
            handleClick={navigateToStore}
          >
            Go to the store <RiArrowRightLine />
          </Button>
        </Transition>
        : <Loading />
      }
      <Footer />
    </Transition>
  );
}

export default Home;
