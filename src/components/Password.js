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
import AuthContext from '../context/auth/AuthContext.js';
import Loading from './Loading.js'
import AlertContext from '../context/alert/AlertContext';
import Alert from './Alert.js'

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

export default function Password() {
    const classes = useStyles();
    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;
    const { sendMail, loading, error, clearErrors,mailInfo,clearStatus } = authContext;
    const [mail, setMail] = useState({
        email: ''
    });
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
        setMail({ ...mail, [e.target.name]: e.target.value })

    }

    const onsubmit = (e) => {
        e.preventDefault();
        sendMail(mail);
        // setAlert('Password link is being sent to your email', '#840a0a');

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

                                fullWidth
                                type="email"
                                name="email"
                                label="Enter your Registered Mail_ID"

                                onChange={onchange}
                            // value={mail.email}
                            />
                        </Grid>


                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}>
                        Confirm
                     </Button>
                    <Grid container justify="space-between">
                        <Grid item>
                            <Link to="/login" variant="body2" className={classes.links}>
                                Login here
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