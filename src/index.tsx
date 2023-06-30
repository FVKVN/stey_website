import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css';
import './assets/scss/global.scss';
import { BrowserRouter } from 'react-router-dom';
import App from './views/AppShell/App';
import { ROOT_ELEMENT_ID } from './config/dom.config';

const root = ReactDOM.createRoot(
    document.getElementById(ROOT_ELEMENT_ID) as HTMLElement,
);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
);
