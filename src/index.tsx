import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import './fonts/GTWalsheimPro/stylesheet.css';
import './scss/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <HashRouter>
    <Routes>
      <Route path="/*" element={<App />} />
    </Routes>
  </HashRouter>,
);
