import React from 'react';
import {BrowserRouter, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import PropTypes from 'prop-types';
import {createTheme, ThemeProvider} from '@material-ui/core/styles';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Nav/components/Navbar';
import Routes from './routes'


const theme = createTheme({
    palette: {
        primary: {
            main: '#1ecde2',
        },
    },
});

function App(props) {
    return (
        <ThemeProvider theme={theme}>
            <Provider store={props.store}>
                <div className="w-100">
                    <Navbar/>
                    <div className="w-100 pt-5 mt-5">
                        <BrowserRouter>
                            <Switch>
                                <Routes/>
                            </Switch>
                        </BrowserRouter>
                    </div>
                </div>
            </Provider>
        </ThemeProvider>
    );
}

App.propTypes = {
    store: PropTypes.object.isRequired,
};

export default App;
