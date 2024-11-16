import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { UserProvider } from './context/UserContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
createRoot(document.getElementById('root')).render(
    // <StrictMode>
    <BrowserRouter>
        <ScrollToTop />
        <UserProvider>
            <App />
            <ToastContainer
                position="top-right"
                autoClose={500}
                limit={4}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition:Slide
                style={{ top: '50px' }}
            />
        </UserProvider>
    </BrowserRouter>,
    // </StrictMode>,
);
