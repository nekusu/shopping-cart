import { Link } from 'react-router-dom';
import AnimatedNumber from 'react-animated-numbers';
import Headroom from 'react-headroom';
import {
  addScrollableSelector,
  disablePageScroll,
} from 'scroll-lock';
import {
  RiGameLine,
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

  return (
    <Headroom upTolerance={1}>
      <Transition
        className="Header"
        direction="down"
        distance={20}
      >
        <Link to="/">
          <Button className="Logo">
            <RiGameLine /> GameStore
          </Button>
        </Link>
        <SearchBar />
        <Button
          className="Cart"
          handleClick={() => {
            setIsCartOpen(true);
            addScrollableSelector('.Items');
            disablePageScroll();
          }}
        >
          <RiShoppingBag2Line />
          Cart
          <div><AnimatedNumber animateToNumber={cartItems.length} /></div>
        </Button>
      </Transition>
    </Headroom>
  );
}

export default Header;
