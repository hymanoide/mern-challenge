import React from "react";
import {Redirect, Route} from "react-router-dom";
import PostListPage from "./Post/pages/PostListPage/PostListPage";
import PostDetailPage from "./Post/pages/PostDetailPage/PostDetailPage";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import LoginPage from "./User/pages/LoginPage/LoginPage";
import LogoutPage from "./User/pages/LogoutPage/LogoutPage";
import RegisterPage from "./User/pages/RegisterPage/RegisterPage";

function Routes() {

    const isAuthenticated = useSelector((state) => state.users.isAuthenticated);

    return (
        <>
            {/*<Route path="/" exact component={PostListPage}/>*/}
            <Route exact path="/">
                {<PostListPage showAddPost={isAuthenticated}/>}
            </Route>

            <Route path="/posts/:cuid/:slug" exact component={PostDetailPage}/>


            {/* User account routing */}
            {/*TODO: Implement ./util/PrivateRoute component*/}
            <Route exact path="/register">
                {isAuthenticated ? <Redirect to="/"/> : <RegisterPage/>}
            </Route>
            <Route exact path="/login">
                {isAuthenticated ? <Redirect to="/"/> : <LoginPage/>}
            </Route>
            <Route exact path="/logout">
                {isAuthenticated ? <LogoutPage/> : <Redirect to="/"/>}
            </Route>

        </>
    )
}

Routes.propTypes = {authenticated: PropTypes.any};

export default Routes;
