import { motion, useAnimation } from 'framer-motion';
import { RiSearchLine } from 'react-icons/ri';
import Button from './Button';

function SearchBar() {
  const formControls = useAnimation();
  const setFormMaxWidth = (width: number) => {
    formControls.start({ maxWidth: width });
  };

  return (
    <motion.form
      className="SearchBar"
      initial={{ maxWidth: 400 }}
      animate={formControls}
    >
      <input
        type="text"
        placeholder="Search games..."
        onFocus={() => setFormMaxWidth(700)}
        onBlur={() => setFormMaxWidth(400)}
      />
      <Button type="submit" title="Search">
        <RiSearchLine />
      </Button>
    </motion.form>
  );
}

export default SearchBar;
