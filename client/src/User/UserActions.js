import callApi from '../util/apiCaller';

// Export Constants
// export const ADD_POST = 'ADD_POST';
// export const ADD_POSTS = 'ADD_POSTS';
// export const DELETE_POST = 'DELETE_POST';

export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const REGISTER_ERROR = 'REGISTER_ERROR';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT_USER = 'LOGOUT_USER';

// Export Actions
export function registerUser(user) {
    return {
        type: REGISTER_USER,
        user,
    };
}

export function registerUserError(user) {
    return {
        type: REGISTER_USER,
        user,
    };
}

export function registerUserRequest(data) {
    return (dispatch) => {
        return callApi('auth/register', 'post', {
            username: data.username,
            password: data.password,
            email: data.email,
        }).then(res => {
            if (res.user) {
                dispatch(registerUser(res));
            } else {
                dispatch(registerUserError(res));
            }
        })
    };
}

export function loginUser(user) {
    return {
        type: LOGIN_USER,
        user,
    };
}

export function loginUserError(user) {
    return {
        type: LOGIN_ERROR,
        user,
    };
}

export function loginUserRequest(user) {
    return (dispatch) => {
        return callApi('auth/login', 'post', {
            username: user.username,
            password: user.password,
        }).then(res => {
            if (res.user_details && res.token) {
                alert(`Welcome, ${res.user_details.username}`);
                dispatch(loginUser(res));
            } else {
                alert(res.error);
                dispatch(loginUserError(res));
            }
        })
    };

}


export function logoutUser() {
    return {
        type: LOGOUT_USER,
    };
}

export function logoutUserRequest() {
    return (dispatch) => {
        dispatch(logoutUser())
    };
}
