import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { UserProvider } from './context/UserContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
    // <StrictMode>
    <BrowserRouter>
        <UserProvider>
            <App />
            <ToastContainer />
        </UserProvider>
    </BrowserRouter>,
    // </StrictMode>,
);
