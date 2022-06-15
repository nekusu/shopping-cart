import { useNavigate } from 'react-router-dom';
import AnimatedNumber from 'react-animated-numbers';
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

  return (
    <Headroom upTolerance={1}>
      <Transition
        className="Header"
        direction="down"
        distance={20}
      >
        <Button
          className="Logo"
          handleClick={() => navigate('/')}
        >
          <RiReactjsLine /> GameStore
        </Button>
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
