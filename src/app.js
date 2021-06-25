import React from 'react'
import Register from './components/Register';
import Header from './components/Header.js'
import SignIn from './components/SignIn';

import Home from './components/Home'
import JournalState from '../src/context/journal/JournalState';

    import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AuthState from '../src/context/auth/AuthState';
import AlertState from '../src/context/alert/AlertState';
import { Link } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute.js';
import DashBoard from './components/Dashboard/Dashboard.js'
import Password from './components/Password.js'
import ForgotPassword from './components/ForgetPassword.js'
function app() {
    const themeLight = createMuiTheme({
        typography: {
            fontFamily: [
                'Space Mono',
                'monospace',
            ].join(','),
        },
        palette: {
            background: {
                default: "#e4f0e2"
            },
            primary: {
                main: '#361B44'
            },
            secondary: {
                main: '#343334'
            }
        }
    });
    return (
        <AuthState>
            <AlertState>

                <Router>

                    <ThemeProvider theme={themeLight}>
                        <div>
                            <Header />
                            <Switch>
                                <Route exact path='/' component={Home} />
                                <Route exact path='/register' component={Register} />
                                <Route exact path='/login' component={SignIn} />
                                <Route exact path='/password' component={Password} />
                                <Route exact path='/forgotpassword' component={ForgotPassword} />
                                 
                                <JournalState>
                                    <PrivateRoute exact path='/dashboard' component={DashBoard} />
                                   
                                </JournalState>

                                <Route component={
                                    () => (
                                        <h1>Not Found.
                                Go Back <Link to='/'>Home Page</Link>
                                        </h1>
                                    )
                                } />
                            </Switch>

                        </div>

                    </ThemeProvider>


                </Router>

            </AlertState>

        </AuthState>






    )
}

export default app
