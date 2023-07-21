import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import navbarStyles from './Navbar.styles';
import {useSelector} from "react-redux";


function Navbar() {

    const isAuthenticated = useSelector((state) => state.users.isAuthenticated);
    const loggedUser = useSelector((state) => state.users.loggedUser);


    return (

        <AppBar position="static">
            <Toolbar style={navbarStyles.toolbar}>
                <Typography variant="h6">
                    <Link href="/" style={navbarStyles.link}>
                        Home
                    </Link>
                </Typography>
                {!isAuthenticated ?
                    <div>
                        <Typography variant="h6" style={navbarStyles.linkContainer}>
                            <Link href="/register" style={navbarStyles.link}>Register</Link>
                        </Typography>
                        <Typography variant="h6" style={navbarStyles.linkContainer}>
                            <Link href="/login" style={navbarStyles.link}>Login</Link>
                        </Typography>
                    </div>
                    :
                    <div>
                        {/*TODO: Extract in-line css styles*/}
                        <Typography variant="h6" style={{
                            ...navbarStyles.linkContainer,
                            marginRight: '1rem',
                            backgroundColor: 'white',
                            padding: '0.5rem',
                            borderRadius: '0.5rem'
                        }}>
                            <span> Logged as: {loggedUser} </span>
                        </Typography>
                        <Typography variant="h6" style={navbarStyles.linkContainer}>
                            <Link href="/logout" style={navbarStyles.link}>Logout</Link>
                        </Typography>
                    </div>
                }
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
