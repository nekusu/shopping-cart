import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import Headroom from 'react-headroom';
import {
  addScrollableSelector,
  disablePageScroll,
} from 'scroll-lock';
import {
  RiReactjsLine,
  RiShoppingBag2Line,
} from 'react-icons/ri';
import SearchBar from './SearchBar';
import Transition from './Transition';
import Button from './Button';
import { Game } from '../types/Game.types';

interface Props {
  cartItems: Game[],
  setIsCartOpen: (isCartOpen: boolean) => void,
}

function Header(props: Props) {
  const { cartItems, setIsCartOpen } = props;
  const navigate = useNavigate();
  const navigateToHome = () => navigate('/');
  const openCart = () => {
    setIsCartOpen(true);
    addScrollableSelector('.Items');
    disablePageScroll();
  };

  return (
    <Headroom upTolerance={1}>
      <Transition
        className="Header"
        direction="down"
        distance={20}
      >
        <Button
          className="Logo"
          handleClick={navigateToHome}
        >
          <RiReactjsLine /> GameStore
        </Button>
        <SearchBar />
        <Button
          className="Cart"
          handleClick={openCart}
        >
          <RiShoppingBag2Line />
          Cart
          <div>{cartItems.length}</div>
        </Button>
      </Transition>
    </Headroom>
  );
}

export default memo(Header);
