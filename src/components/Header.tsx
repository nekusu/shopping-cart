import { Link } from 'react-router-dom';
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
}

function Header(props: Props) {
  const { cartItems } = props;

  return (
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
      <Button className="Cart">
        <RiShoppingBag2Line />
        Cart
        <span>{cartItems.length}</span>
      </Button>
    </Transition>
  );
}

export default Header;
