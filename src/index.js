import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import store from "./redux/store";
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";


ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('root')
);



