import ReactDOM from 'react-dom/client';
import './index.css';
import './media.css';
import App from '@/App.jsx';
import { HashRouter } from 'react-router-dom';
import { Provider, atom } from 'jotai';
export const globalStateAtom = atom({
  loading: false,
});
let container = null;
document.addEventListener('DOMContentLoaded', () => {
  if (!container) {
    ReactDOM.createRoot(document.getElementById('root')).render(
      <HashRouter>
        <Provider>
          <App />
        </Provider>
      </HashRouter>
    );
  }
});
