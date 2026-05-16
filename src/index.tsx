import './instrument';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { reactErrorHandler } from '@sentry/react';
import App from './App';
import './styles/index.css';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element not found');
}

// React 19: pass Sentry error handlers to createRoot so all error types are captured
createRoot(container, {
  onUncaughtError: reactErrorHandler(),
  onCaughtError: reactErrorHandler(),
  onRecoverableError: reactErrorHandler(),
}).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
