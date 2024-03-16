import ReactDOM from 'react-dom/client';
import './index.css';
import '@/style/media.css';
import '@/style/component.css';
import App from '@/App.jsx';
import { HashRouter } from 'react-router-dom';
let container = null;
document.addEventListener('DOMContentLoaded', () => {
  if (!container) {
    ReactDOM.createRoot(document.getElementById('root')).render(
      <HashRouter>
        <App />
      </HashRouter>
    );
  }
});
