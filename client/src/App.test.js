import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import App from './App';
import configureMockStore from 'redux-mock-store';
import thunk from "redux-thunk";


// Create a initial state
const initialState = {
    users: {isAuthenticated: false, loggedUser: null},
    posts: {data: []},
};

// Create a mock store
const mockStore = configureMockStore([thunk]);
const store = mockStore(initialState);

test('renders Alaya Blog', () => {
    render(<App store={store}/>);
    const linkElement = screen.getByText(/Alaya Blog/i);
    expect(linkElement).toBeInTheDocument();
});


// WIP. Write here new tests according your needs.

