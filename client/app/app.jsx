/**
 *
 * app.jsx
 *
 */

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from './store';
import { SocketProvider } from './contexts/Socket.jsx';
import Application from './containers/Application/index.jsx';
import ScrollToTop from './scrollToTop.jsx';

// Import application sass styles
import './styles/style.scss';

// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';

// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';

// react-bootstrap-table2 styles
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

// rc-slider style
import 'rc-slider/assets/index.css';

const App = () => (
    <Provider store={store}>
        <BrowserRouter>
            <SocketProvider>
                <ScrollToTop>
                    <Application />
                </ScrollToTop>
            </SocketProvider>
        </BrowserRouter>
    </Provider>
);

export default App;