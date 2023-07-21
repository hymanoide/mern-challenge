import React from 'react';
import Logo from '../../../logo.svg';
import LoginForm from "../../components/LoginForm";

const LoginPage = () => {

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
                    <LoginForm/>
                </div>
            </div>
        </div>
    );
};


export default LoginPage;
