import { Transition } from '../../../components';
import { Game } from '../../../types/Game.types';

function Info({ game }: { game: Game }) {
  const {
    name,
    description_raw,
    released,
    platforms,
    genres,
    website,
  } = game;

  return (
    <Transition className="Info">
      <div className="About">
        <h4>About</h4>
        <p>{description_raw}</p>
      </div>
      <div className="MoreInfo">
        <a href={website} target="_blank" rel="noreferrer">
          {name} Website
        </a>
        <p>Released: {new Date(released).toLocaleDateString()}</p>
        <p>Platforms: {platforms.map((p) => p.platform.name).join(', ')}</p>
        <p>Genres: {genres.map((g) => g.name).join(', ')}</p>
      </div>
    </Transition>
  );
}

export default Info;
