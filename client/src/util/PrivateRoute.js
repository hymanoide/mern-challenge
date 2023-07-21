import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {useSelector} from 'react-redux';

// WIP. Implement a component to manage private routes accordingly.

const PrivateRoute = ({component: Component, ...rest}) => {
    const isAuthenticated = useSelector((state) => state.users.isAuthenticated);

    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated ? <Component {...props} /> : <Redirect to="/login"/>
            }
        />
    );
};

export default PrivateRoute;




