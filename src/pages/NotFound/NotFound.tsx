import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Transition } from '../../components';

const duration = 3;

function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/');
    }, duration * 1000);
    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <Transition className="NotFound" direction="up" distance={100}>
      <h1>404</h1>
      <p>Page not found.</p>
      <div className="Redirect">
        Redirecting to homepage...
        <motion.div
          className="ProgressBar"
          initial={{ width: 0 }}
          animate={{ width: '100%', transition: { duration } }}
        />
      </div>
    </Transition>
  );
}

export default NotFound;
