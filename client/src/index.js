import React from 'react';
import * as ReactDOM from 'react-dom';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import posts from './Post/PostReducer';
import users from './User/UserReducer'
import './index.css';
import App from './App';

// Middleware and store enhancers
const enhancers = [
    applyMiddleware(thunk),
];

const initialStore = createStore(combineReducers({posts, users}), {}, compose(...enhancers));

ReactDOM.render(
    <App store={initialStore}/>,
    document.getElementById('root')
);
