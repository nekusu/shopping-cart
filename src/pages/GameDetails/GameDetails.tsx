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
  games: Game[] | null,
  cartItems: Game[],
  addToCart: (game: Game) => void,
}

function GameDetails(props: Props) {
  const { games, cartItems, addToCart } = props;
  const params = useParams();
  const id = Number(params.gameId);
  const [game, setGame] = useState<Game>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDetails = async () => {
      const response = await gameDetails({ id });
      setGame((g) => ({ ...g, ...response }));
    };
    const loadScreenshots = async () => {
      const response = await gameScreenshots({ id });
      const short_screenshots = response.results;
      setGame((g) => ({ ...g, short_screenshots }) as Game);
    };
    loadDetails();
    // Check if game exists in the games array to get the screenshots,
    // otherwise fetch them from the API.
    // This is to ensure that there's no unnecessary API call.
    if (games) {
      const game = games.find((game) => game.id === Number(id));
      game ? setGame((g) => ({ ...g, ...game })) : loadScreenshots();
    } else {
      loadScreenshots();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (game?.description_raw && game?.short_screenshots) {
      // When the screenshots are loaded from the API instead of
      // the games array, the first screenshot is missing, so it has
      // to be added manually.
      if (!game.short_screenshots.find((ss) => ss.id === -1)) {
        setGame((g) => ({
          ...g,
          short_screenshots: [
            { id: -1, image: game.background_image },
            ...(g?.short_screenshots || []),
          ],
        }) as Game);
      }
      if (!game?.price) {
        setGame((g) => ({ ...g, price: getPrice(g as Game) }) as Game);
      }
      setIsLoading(false);
    }
  }, [game]);

  return (
    <Transition className="GameDetails" direction="left">
      <NavBar showStoreButton title={game?.name} />
      {isLoading
        ? <Loading />
        : game && (
          <Transition className="Grid" direction="down">
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
        )
      }
    </Transition>
  );
}

export default GameDetails;
