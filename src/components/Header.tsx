import { Link } from 'react-router-dom';
import {
  RiGameLine,
  RiShoppingBag2Line,
} from 'react-icons/ri';
import SearchBar from './SearchBar';
import Button from './Button';

interface Props {
  cartItems: unknown[];
}

function Header(props: Props) {
  const { cartItems } = props;

  return (
    <header className="Header">
      <Link to="/">
        <Button className="Logo">
          <RiGameLine /> Game Store
        </Button>
      </Link>
      <SearchBar />
      <Button className="Cart">
        <RiShoppingBag2Line />
        Cart
        <span>{cartItems.length}</span>
      </Button>
    </header>
  );
}

export default Header;
