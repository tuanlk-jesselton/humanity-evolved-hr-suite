import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// For development, you can temporarily remove StrictMode
// to prevent double mounting in development
const root = createRoot(document.getElementById('root')!);

root.render(<App />);
