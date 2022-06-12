import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components';
import './scss/App.scss';

function App() {
  const [cartItems] = useState([]);

  return (
    <div className="App">
      <Header cartItems={cartItems} />
      <Routes>
        <Route path="/" element={null}></Route>
      </Routes>
    </div>
  );
}

export default App;
