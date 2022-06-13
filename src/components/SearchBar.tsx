import { FormEvent, useEffect, useState } from 'react';
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { RiSearchLine } from 'react-icons/ri';
import Button from './Button';

function SearchBar() {
  const [inputValue, setInputValue] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const formControls = useAnimation();
  const setFormMaxWidth = (width: number) => {
    formControls.start({ maxWidth: width });
  };
  const search = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputValue) return;
    const searchParams = createSearchParams({ search: inputValue });
    navigate({
      pathname: '/games',
      search: searchParams.toString(),
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setInputValue(searchParams.get('search') || ''), []);

  return (
    <motion.form
      className="SearchBar"
      initial={{ maxWidth: 400 }}
      animate={formControls}
      onSubmit={search}
    >
      <input
        type="text"
        placeholder="Search games..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
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
