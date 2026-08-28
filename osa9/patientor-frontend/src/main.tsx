import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';

const container = document.getElementById('root');

if (!container) {
  throw new Error('root element not found');
}

createRoot(container).render(
  <Router>
    <App />
  </Router>
);
