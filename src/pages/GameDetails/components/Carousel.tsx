import { Children, useRef, useState } from 'react';
import { motion, PanInfo, useAnimation } from 'framer-motion';
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
  const carousel = useRef<HTMLDivElement>(null);
  const carouselControls = useAnimation();
  const animateCarousel = () => {
    carouselControls.start({ x: `${-index * 100}%` });
  };
  const timeout = useRef<NodeJS.Timer>();
  const setIndexByTimeout = () => {
    timeout.current = setTimeout(() => {
      setIndex((index) => index + 1);
    }, duration * 1000);
  };
  const setIndexByPosition = (_event: never, info: PanInfo) => {
    const { x } = info.offset;
    const carouselWidth = carousel.current?.clientWidth || 1;
    const initialOffset = index * carouselWidth;
    const newIndex = Math.round((initialOffset + x * -2) / carouselWidth);
    if (newIndex !== index) {
      setIndex(newIndex);
    } else {
      animateCarousel();
      setIndexByTimeout();
    }
  };

  useEffect(() => {
    animateCarousel();
    if (index >= childrenArray.length) {
      setIndex(0);
    } else if (index < 0) {
      setIndex(childrenArray.length - 1);
    }
    setIndexByTimeout();
    return () => clearTimeout(timeout.current);
  }, [index]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={carousel} className="Carousel">
      <Button handleClick={() => setIndex((index) => index - 1)}>
        <RiArrowLeftSLine />
      </Button>
      <motion.div
        className="Items"
        drag="x"
        dragMomentum={false}
        onDragStart={() => clearTimeout(timeout.current)}
        onDragEnd={setIndexByPosition}
        initial={{ x: 0 }}
        animate={carouselControls}
        transition={{ duration: 0.6 }}
      >
        {children}
      </motion.div>
      {useDots && (
        <div className="Dots">
          {childrenArray.map((_, i) => (
            <motion.div
              key={`dot-${i}`}
              className="Dot"
              initial={false}
              animate={{ scale: +(index !== i) }}
              transition={{ duration: 0.2 }}
              onClick={() => setIndex(i)}
            />
          ))}
          <motion.div
            className="Dot active"
            initial={false}
            animate={{ x: index * 22 }}
            transition={{ duration: 0.35 }}
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
