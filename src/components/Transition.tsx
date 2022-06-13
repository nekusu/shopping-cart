import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  layout?: boolean;
  className?: string;
  direction?: 'left' | 'right' | 'up' | 'down' | 'none';
  distance?: number;
  durationIn?: number;
  durationOut?: number;
}

function Transition(props: Props) {
  const {
    children,
    layout = false,
    className,
    direction = 'none',
    distance = 50,
    durationIn,
    durationOut,
  } = props;
  const directions = {
    left: { x: -distance },
    right: { x: distance },
    up: { y: -distance },
    down: { y: distance },
    none: { x: 0, y: 0 },
  };
  const transitionIn = {
    type: 'spring',
    duration: durationIn,
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
        x: transitionIn,
        y: transitionIn,
      },
    },
    out: {
      opacity: 0,
      ...directions[direction],
      transition: {
        type: 'just',
        duration: durationOut,
      },
    },
  };

  return (
    <motion.div
      layout={layout}
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
