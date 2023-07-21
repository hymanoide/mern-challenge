import {LOGIN_ERROR, LOGIN_USER, LOGOUT_USER, REGISTER_ERROR, REGISTER_USER} from './UserActions';

// Check for the presence of the JWT token in local storage
const jwtToken = localStorage.getItem('jwtToken');
const username = localStorage.getItem('username');


const initialState = {
  isAuthenticated: !!jwtToken,
  loggedUser: username,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER :
    case LOGIN_USER :
      if (action.user.token) {
        localStorage.setItem('jwtToken', action.user.token);
        localStorage.setItem('username', action.user.user_details.username);

        return {
          ...state,
          loggedUser: action.user.user_details.username,
          isAuthenticated: true,
        };
      }
      return state;

    case REGISTER_ERROR:
    case LOGIN_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        loggedUser: null,
      };

    case LOGOUT_USER :
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('username');

      return {
        ...state,
        isAuthenticated: false,
        loggedUser: null,
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all users
export const getUsers = state => state.posts.data;

// Get user by username
export const getUser = (state, username) => state.posts.data.filter(post => post.username === username)[0];

// Export Reducer
export default UserReducer;
