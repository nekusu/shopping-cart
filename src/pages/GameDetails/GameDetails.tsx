import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BackgroundImage } from 'react-image-and-background-image-fade';
import { Button, Loading, Transition } from '../../components';
import Carousel from './components/Carousel';
import Info from './components/Info';
import { gameScreenshots, gameDetails } from '../../rawg-api';
import { Game } from '../../types/Game.types';
import NavBar from '../../components/NavBar';
import { RiAddLine, RiCheckLine } from 'react-icons/ri';
import getPrice from '../../utils/getPrice';

interface Props {
  cartItems: Game[],
  addToCart: (game: Game) => void,
}

function GameDetails({ cartItems, addToCart }: Props) {
  const params = useParams();
  const id = Number(params.gameId);
  const [game, setGame] = useState<Game>();

  useEffect(() => {
    (async () => {
      const [game, screenshots] = await Promise.all([
        gameDetails({ id }),
        gameScreenshots({ id }),
      ]);
      const short_screenshots = [
        { id: -1, image: game.background_image },
        ...screenshots.results,
      ];
      const price = getPrice(game);
      setGame({ ...game, short_screenshots, price });
    })();
  }, [id]);

  return (
    <Transition className="GameDetails" direction="left">
      <NavBar showStoreButton title={game?.name} />
      {game
        ? <Transition className="Grid">
          <Carousel duration={6}>
            {game.short_screenshots.map((screenshot) => (
              <div
                key={`img-${screenshot.id}`}
                className="Image"
              >
                <BackgroundImage
                  className="BackgroundImage"
                  wrapperClassName="Wrapper"
                  src={screenshot.image}
                  transitionTime="1s"
                  isResponsive
                  lazyLoad
                />
              </div>
            ))}
          </Carousel>
          <Info game={game} />
          <div className="Price">
            ${game.price}
            {cartItems.find((item) => item.id === id)
              ? <Transition className="Added">
                Added <RiCheckLine />
              </Transition>
              : <Button handleClick={() => addToCart(game)}>
                Add to cart <RiAddLine />
              </Button>
            }
          </div>
        </Transition>
        : <Loading />
      }
    </Transition>
  );
}

export default GameDetails;
