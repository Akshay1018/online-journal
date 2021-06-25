import React, { useContext, useState,useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';
import AlertContext from '../context/alert/AlertContext.js'
import Alert from './Alert'
import Loading from './Loading.js'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  links: {
    color: 'inherit',
    textDecoration: 'none'
  }
}));

export default function SignUp(props) {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
 
  const { login, isAuthenticated, clearErrors, error, user,loading} = authContext;
  const {setAlert} = alertContext;
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });
  useEffect(() => {
    if (user && isAuthenticated) {
        props.history.push('/dashboard')
    }
    if (error) {
        error.forEach(err => {
            setAlert(err.msg, '#840a0a');
        });
        clearErrors();
    }
}, [error, isAuthenticated, setAlert, clearErrors,user,props.history])
  const onChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    login(userData);
  }
  return (

    <Container component="main" maxWidth="xs">

      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {loading && <Loading/>}
        <Alert />
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <Grid container spacing={2}>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                type="email"
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={onChange}
                value={userData.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={onChange}
                value={userData.password}
              />
            </Grid>

          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}

          >
            Login
          </Button>
          <Grid container justify="space-between">
            <Grid item>
              <Link to="/register" variant="body2" className={classes.links}>
                Sign_up
              </Link>
            </Grid>
            <Grid item>
              <Link to="/password" variant="body2" className={classes.links}>
                Forgot Password
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}