import * as React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './redux/store/index';
import ThemeProvider from './ThemeProvider';
import ReactDOM from 'react-dom/client';
import "react-toastify/ReactToastify.min.css";
import './i18n';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <ReduxProvider store={store}>
            <React.Fragment>

                <ThemeProvider />
                {/* Insert your main App component or Router here if needed */}
            </React.Fragment>

        </ReduxProvider>
    </React.StrictMode>
);
