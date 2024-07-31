import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';

// Ensure that the type of the root element is HTMLDivElement or null
const rootElement = document.getElementById('root') as HTMLElement | null;

if (rootElement) {
    // Create a root and render the React application
    const root = ReactDOM.createRoot(rootElement);

    root.render(
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </GoogleOAuthProvider>
    );
}
