import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Redux/configureStore'

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter basename="/cloud">
            <Route path="/" render={(props) =>
                <App {...props} />
            } />
        </BrowserRouter>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
