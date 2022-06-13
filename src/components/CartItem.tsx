import { RiCloseLine } from 'react-icons/ri';
import Transition from './Transition';
import Button from './Button';
import { Game } from '../types/Game.types';

interface Props {
  game: Game,
  removeFromCart: (id: number) => void,
}

function CartItem(props: Props) {
  const { game, removeFromCart } = props;
  const { id, name, price } = game;

  return (
    <Transition
      key={`cart-${id}`}
      layout
      className="Item"
      direction="right"
      durationOut={0.15}
    >
      <Button>{name}</Button>
      ${price}
      <Button
        className="Remove"
        title="Remove"
        handleClick={() => removeFromCart(id)}
      >
        <RiCloseLine />
      </Button>
    </Transition>
  );
}

export default CartItem;
