import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  title?: string;
  handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function Button(props: Props) {
  const {
    children,
    className = '',
    type = 'button',
    title,
    handleClick,
  } = props;

  return (
    <motion.button
      className={`Button ${className}`}
      type={type}
      title={title}
      onClick={handleClick}
    >
      {children}
    </motion.button>
  );
}

export default Button;
