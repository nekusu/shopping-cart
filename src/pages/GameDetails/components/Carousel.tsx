import { Children, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../../components';
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from 'react-icons/ri';
import { useEffect } from 'react';

interface Props {
  children: React.ReactNode,
  duration: number,
  useDots?: boolean,
}

function Carousel(props: Props) {
  const { children, duration, useDots = true } = props;
  const [index, setIndex] = useState(0);
  const childrenArray = Children.toArray(children);
  const timeout = useRef<NodeJS.Timer>();

  useEffect(() => {
    if (index >= childrenArray.length) {
      setIndex(0);
    } else if (index < 0) {
      setIndex(childrenArray.length - 1);
    }
    timeout.current = setTimeout(() => {
      setIndex((index) => index + 1);
    }, duration * 1000);
    return () => clearTimeout(timeout.current);
  }, [index]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="Carousel">
      <Button handleClick={() => setIndex((index) => index - 1)}>
        <RiArrowLeftSLine />
      </Button>
      <motion.div
        className="Items"
        initial={{ x: 0 }}
        animate={{ x: `${-index * 100}%` }}
        transition={{ duration: 0.75 }}
      >
        {children}
      </motion.div>
      {useDots && (
        <div className="Dots">
          {childrenArray.map((_, i) => (
            <motion.div
              key={`dot-${i}`}
              className={'Dot'}
              initial={false}
              animate={{ scale: +(index !== i) }}
              transition={{ type: 'spring', duration: 0.01 }}
              onClick={() => setIndex(i)}
            />
          ))}
          <motion.div
            layout
            className={'Dot Active'}
            initial={false}
            animate={{ x: index * 22 }}
            transition={{ type: 'spring', duration: 0.01 }}
          />
        </div>
      )}
      <Button handleClick={() => setIndex((index) => index + 1)}>
        <RiArrowRightSLine />
      </Button>
    </div>
  );
}

export default Carousel;
