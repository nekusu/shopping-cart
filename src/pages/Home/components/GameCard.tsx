import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BackgroundImage } from 'react-image-and-background-image-fade';

interface Props {
  id: number,
  name: string,
  backgroundImage: string,
  duration?: number,
  big: boolean,
}

function GameCard({
  id,
  name,
  backgroundImage,
  duration,
  big = false,
}: Props) {
  const navigate = useNavigate();
  const navigateToGame = () => navigate(`/games/${id}`);

  return (
    <motion.div
      layoutId={`${id}`}
      className={`GameCard ${big ? 'Big' : ''}`}
      animate={{ borderRadius: '15px' }}
      whileHover={{ scale: big ? 1 : 1.025 }}
      whileTap={{ scale: 0.975 }}
      transition={{
        layout: { type: 'spring', stiffness: 30 },
        scale: { duration: 0.15 },
      }}
      onClick={navigateToGame}
    >
      <BackgroundImage
        className="BackgroundImage"
        wrapperClassName="Wrapper"
        src={backgroundImage}
        transitionTime="1s"
        isResponsive
      >
        <div className="Overlay">
          <AnimatePresence exitBeforeEnter>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {name}
            </motion.h3>
            {big && (
              <motion.div
                key={`progress-${id}`}
                className="ProgressBar"
                initial={{ width: 0 }}
                animate={{ width: '100%', transition: { duration } }}
                exit={{ opacity: 0 }}
              />
            )}
          </AnimatePresence>
        </div>
      </BackgroundImage>
    </motion.div >
  );
}

export default GameCard;
