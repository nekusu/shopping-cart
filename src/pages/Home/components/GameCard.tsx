import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  id: number,
  name: string,
  backgroundImage: string,
  duration?: number,
  big: boolean,
}

function GameCard(props: Props) {
  const {
    id,
    name,
    backgroundImage,
    duration,
    big = false,
  } = props;

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
      style={{ backgroundImage: `url(${backgroundImage})` }}
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
    </motion.div>
  );
}

export default GameCard;
