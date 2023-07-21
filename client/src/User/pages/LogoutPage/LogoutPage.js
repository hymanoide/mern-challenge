import React from 'react';
import Logo from '../../../logo.svg';
import Button from "@material-ui/core/Button";
import {Link} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {logoutUserRequest} from "../../UserActions";

const LogoutPage = () => {

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUserRequest());
    };


    return (
        <div className="container">
            <div className="row">
                <div className="col-12 d-flex align-items-center">
                    <img className="mx-3" src={Logo} alt="Logo" style={{height: '72px'}}/>
                    <h1 className="mt-4">
                        Alaya Blog
                    </h1>
                </div>
            </div>
            <hr/>
            <div className="row">
                <div className="col-12">
                    Are you sure to logout?
                    <Button onClick={handleLogout}>Yes</Button>
                    <br/>
                    <Link href="/" variant="body2">
                        {"Go back"}
                    </Link>
                </div>
            </div>
        </div>
    );
};


export default LogoutPage;
