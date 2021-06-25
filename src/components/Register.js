import React, { useContext, useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';
import AlertContext from '../context/alert/AlertContext';
import Alert from '../components/Alert';
import Loading from './Loading.js';

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
}));

export default function Register(props) {

  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { userRegister, isAuthenticated, error, clearErrors, loading } = authContext;
  const { setAlert } = alertContext

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmpassword: ''
  });
  const [agree, setAgree] = useState(false);
  useEffect(() => {
    if (isAuthenticated) {
      return props.history.push('/');
    }
    if (error) {
      error.forEach(err => {
        setAlert(err.msg, '#840a0a')
      });
      clearErrors();
    }
  }, [error, isAuthenticated, setAlert, props.history, clearErrors])
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (checkPassword()) {
      return userRegister(user);
    }
    return setAlert("Password mismatch! Enter correct password", "#840a0a");
  }
  const checkPassword = () => {
    if (user.password === user.confirmpassword) {
      return true;
    }
  }

  const chkBoxHandler = () => {
    setAgree(!agree);
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
        {loading && <Loading />}
        <Alert  />
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField

                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                type="text"
                id="firstName"
                label="Name"
                value={user.name}
                onChange={onChange}


              />
            </Grid>

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
                value={user.email}
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
                value={user.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmpassword"
                label="Confirm Password"
                type="password"
                id="confirm_password"
                autoComplete="current-password"
                onChange={onChange}
                value={user.confirmpassword}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" onChange={chkBoxHandler} />}
                label="I agree with T&C."

              />
              <p>View term and conditions <Link to='/viewtandc'>Click here</Link></p>
            </Grid>
          </Grid>
          <Button
            disabled={!agree}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
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