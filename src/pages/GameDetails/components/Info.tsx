import { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollTo } from 'framer-motion-scroll-to-hook';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import { Transition, Button } from '../../../components';
import { Game } from '../../../types/Game.types';

function Info({ game }: { game: Game }) {
  const {
    name,
    description_raw,
    released,
    platforms,
    genres,
    website,
    developers,
    publishers,
  } = game;
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollTo = useScrollTo();

  return (
    <Transition className="Info">
      <div className="About">
        <h4>About</h4>
        {description_raw.split('###').map((p, index) => (
          <p key={index}>{p}</p>
        ))}
      </div>
      <motion.div
        className="MoreInfo"
        initial={false}
        animate={{ minHeight: isExpanded ? '220px' : '60px' }}
      >
        {isExpanded
          ? <>
            <Transition
              key="expanded"
              className="Expanded"
              direction="up"
              distance={30}
            >
              <a href={website} target="_blank" rel="noreferrer">
                {name} Website
              </a>
              <p>Released: {new Date(released).toLocaleDateString()}</p>
              <p>Platforms: {platforms.map((p) => p.platform.name).join(', ')}</p>
              <p>Genres: {genres.map((g) => g.name).join(', ')}</p>
              <p>Developers: {developers.map((d) => d.name).join(', ')}</p>
              <p>Publishers: {publishers.map((p) => p.name).join(', ')}</p>
            </Transition>
            <motion.div className="Expand" layoutId="expand-button">
              <Button handleClick={() => setIsExpanded(false)}>
                Hide <RiArrowUpSLine />
              </Button>
            </motion.div>
          </>
          : <motion.div className="Expand" layoutId="expand-button">
            <Button handleClick={() => {
              setIsExpanded(true);
              scrollTo(10000);
            }}>
              More <RiArrowDownSLine />
            </Button>
          </motion.div>
        }
      </motion.div>
    </Transition>
  );
}

export default Info;
