import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  className?: string;
  direction?: 'left' | 'right' | 'up' | 'down' | 'none';
  distance?: number;
}

function Transition(props: Props) {
  const {
    children,
    className,
    direction = 'none',
    distance = 50,
  } = props;
  const directions = {
    left: { x: -distance },
    right: { x: distance },
    up: { y: -distance },
    down: { y: distance },
    none: { x: 0, y: 0 },
  };
  const animationConfig = {
    in: {
      opacity: 0,
      ...directions[direction],
    },
    animate: {
      opacity: 1,
      ...directions.none,
      transition: {
        x: { type: 'spring' },
        y: { type: 'spring' },
      },
    },
    out: {
      opacity: 0,
      ...directions[direction],
      transition: { type: 'just' },
    },
  };

  return (
    <motion.div
      className={className}
      variants={animationConfig}
      initial="in"
      animate="animate"
      exit="out"
    >
      {children}
    </motion.div >
  );
}

export default Transition;
