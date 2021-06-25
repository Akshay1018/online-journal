import React, { useContext, useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import Alert from './Alert.js';
import Loading from './Loading';
import AlertContext from '../context/alert/AlertContext';
import AuthContext from '../context/auth/AuthContext';

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

export default function SignUp() {
  const classes = useStyles();

  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { resetPassword, loading, error, clearErrors,mailInfo,clearStatus } = authContext;
  const { setAlert } = alertContext
  const [passw, setPassw] = useState({
    password: "",
    confirmpassword: ""
  })
  useEffect(() => {
    if (error) {
      error.forEach(err => {
        setAlert(err.msg, '#840a0a')
      });
      clearErrors();
    }
    if(mailInfo){
      setAlert(mailInfo,'#840a0a');
      clearStatus();
    }
  }, [error, clearErrors, setAlert,mailInfo,clearStatus])

  const onchange = (e) => {
    setPassw({ ...passw, [e.target.name]: e.target.value })
  }

  const onsubmit = (e) => {
    e.preventDefault();
    if (checkPassword()) {
     resetPassword(passw);
   
    }
    return setAlert("Password mismatch!Enter correct password", "#840a0a");
  }
  const checkPassword = () => {
    if (passw.password === passw.confirmpassword) {
      return true;
    }
  }

  return (

    <Container component="main" maxWidth="xs">

      <CssBaseline />
      
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        {loading && <Loading />}
      <Alert />
        <form className={classes.form} noValidate onSubmit={onsubmit}>
          <Grid container spacing={2}>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Enter New Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={onchange}
                value={passw.password}
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
                onChange={onchange}
                value={passw.confirmpassword}
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
            Confirm
          </Button>
          <Grid container justify="space-between">
            <Grid item>
              <Link to="/login" variant="body2" className={classes.links}>
                Log_in
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