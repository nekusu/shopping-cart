import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollTo } from 'framer-motion-scroll-to-hook';
import { RiArrowRightLine } from 'react-icons/ri';
import { Footer, Transition, Button } from '../../components';
import { Game } from '../../types/Game.types';
import GameCard from './components/GameCard';

interface Props {
  games: Game[],
}

const cardDuration = 10;
const cycleArray = (array: Game[]) => {
  const newArray = [...array];
  newArray.push(newArray.shift() as Game);
  return newArray;
};
const getRandomGames = (games: Game[]): Game[] => {
  const randomGames = new Set();
  while (randomGames.size < 4) {
    const index = Math.floor(Math.random() * games.length);
    randomGames.add(games[index]);
  }
  return [...randomGames] as Game[];
};


function Home(props: Props) {
  const { games } = props;
  const [homeGames, setHomeGames] = useState(getRandomGames(games));
  const scrollTo = useScrollTo();

  useEffect(() => {
    scrollTo();
    const interval = setInterval(() => {
      setHomeGames(games => cycleArray(games));
    }, cardDuration * 1000);
    return () => clearInterval(interval);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Transition className="Home" direction="left">
        <div className="Grid">
          {homeGames.map(({ id, name, background_image }, i) => (
            <GameCard
              key={id}
              id={id}
              name={name}
              backgroundImage={background_image}
              duration={cardDuration}
              big={i === 0}
            />
          ))}
          <Link to="games" className="Store">
            <Button>
              Go to the store <RiArrowRightLine />
            </Button>
          </Link>
        </div>
        <Footer />
      </Transition>
    </>
  );
}

export default Home;
