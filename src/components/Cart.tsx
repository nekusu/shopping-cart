import { AnimatePresence, motion } from 'framer-motion';
import { enablePageScroll } from 'scroll-lock';
import { RiArrowRightLine } from 'react-icons/ri';
import { Game } from '../types/Game.types';
import Transition from './Transition';
import CartItem from './CartItem';
import Button from './Button';

interface Props {
  cartItems: Game[],
  setIsCartOpen: (isCartOpen: boolean) => void,
  removeFromCart: (ids: number[]) => void,
}

function Cart(props: Props) {
  const {
    cartItems,
    setIsCartOpen,
    removeFromCart,
  } = props;
  const clearCart = () => {
    removeFromCart(cartItems.map(item => item.id));
  };
  const closeCart = () => {
    setIsCartOpen(false);
    enablePageScroll();
  };
  let gamesCount;
  if (cartItems.length > 1) {
    gamesCount = `${cartItems.length} games`;
  } else if (cartItems.length === 1) {
    gamesCount = '1 game';
  } else {
    gamesCount = 'No games added';
  }
  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.price, 0)
    .toFixed(2);

  return (
    <>
      <Transition className="Background">
        <div onClick={closeCart} />
      </Transition>
      <motion.div
        className="CartModal"
        initial={{ opacity: 0, x: '100%' }}
        animate={{ opacity: 1, x: 0 }}
        exit={{
          opacity: 0, x: '100%',
          transition: { duration: 0.25 },
        }}
        transition={{
          type: 'spring',
          duration: 0.5,
        }}
      >
        <div className="CartHeader">
          <h3>{gamesCount}</h3>
          {cartItems.length > 0 && (
            <Button handleClick={clearCart}>Clear</Button>
          )}
        </div>
        <div className="Items">
          <AnimatePresence>
            {cartItems.map((game) => (
              <CartItem
                key={`cart-${game.id}`}
                game={game}
                closeCart={closeCart}
                removeFromCart={removeFromCart} />
            ))}
          </AnimatePresence>
        </div>
        <div className="Checkout">
          <div>Total: ${+totalPrice}</div>
          <Button>Checkout <RiArrowRightLine /></Button>
        </div>
      </motion.div>
    </>
  );
}

export default Cart;
