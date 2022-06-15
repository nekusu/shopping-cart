import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RiArrowLeftLine } from 'react-icons/ri';
import Button from './Button';
import Transition from './Transition';

interface Props {
  showStoreButton: boolean;
  title?: string;
}

function NavBar(props: Props) {
  const { showStoreButton, title } = props;
  const navigate = useNavigate();
  const navigateToStore = () => navigate('/games');

  return (
    <nav className="NavBar">
      {showStoreButton && (
        <Transition direction="left">
          <Button
            className="Store"
            handleClick={navigateToStore}
          >
            <RiArrowLeftLine /> Store
          </Button>
        </Transition>
      )}
      {title && <motion.h2 layout>{title}</motion.h2>}
    </nav>
  );
}

export default NavBar;
