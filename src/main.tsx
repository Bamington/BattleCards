/**
 * main.tsx — Application entry point
 *
 * This is the first file that runs when the app loads.
 * It mounts the root React component (<App />) into the
 * HTML element with id="root" (found in index.html).
 *
 * StrictMode is a development tool that highlights potential
 * issues in the app — it has no effect in production builds.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Global styles — includes Tailwind
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
