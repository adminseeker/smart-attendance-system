import React, { useState } from 'react';
import { sendOtp, resetPassword, logout } from '../actions/auth';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { setAlert } from '../actions/alert';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  root2: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
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
  resize: {
    fontSize: 16,
  },
}));

const ForgotPassword = (props) => {
  const classes = useStyles();
  const hist = useHistory();
  const [formData, setFormData] = useState({
    otp: '',
    email: '',
    password: '',
    newPassword: '',
    newPassword2: '',
  });

  const [passwordError, setPasswordError] = useState('');

  const [click, setClick] = useState(false);

  const { otp, email, newPassword, newPassword2 } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    const res = await props.dispatch(sendOtp(email));
    if (String(res.code) === '1') {
      props.dispatch(setAlert(res.msg, 'success'));
      setClick(true);
    } else {
      props.dispatch(setAlert(res.msg, 'error'));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== newPassword2) {
      setPasswordError('Passwords do not match');
    } else {
      const res = await props.dispatch(resetPassword(email, otp, newPassword));
      console.log('fpdetails', email, otp, newPassword);
      console.log('fp', res);
      if (String(res.code) === '1') {
        props.dispatch(setAlert('Password Reset successfully!!', 'success'));
        await props.dispatch(logout());
        hist.push('/login');
      } else {
        props.dispatch(setAlert(res.msg, 'error'));
      }
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Reset Password
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <Grid container spacing={2}>
            {!click && (
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  name='email'
                  label='email'
                  type='email'
                  id='email'
                  InputProps={{
                    classes: {
                      input: classes.resize,
                    },
                  }}
                  onChange={onChange}
                />
              </Grid>
            )}
            {!click && (
              <Button
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
                onClick={handleSendOtp}
              >
                <Box fontSize={16}>Send OTP</Box>
              </Button>
            )}
            {click && (
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  name='otp'
                  label='OTP'
                  type='password'
                  id='otp'
                  InputProps={{
                    classes: {
                      input: classes.resize,
                    },
                  }}
                  onChange={onChange}
                />
              </Grid>
            )}
            {click && (
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  name='newPassword'
                  label='New Password'
                  type='password'
                  id='newPassword'
                  onChange={onChange}
                  error={!!passwordError}
                  helperText={!!passwordError ? 'Passwords Do not Match!' : ''}
                  InputProps={{
                    classes: {
                      input: classes.resize,
                    },
                  }}
                />
              </Grid>
            )}
            {click && (
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  name='newPassword2'
                  label='Confirm New Password'
                  type='password'
                  id='newPassword2'
                  onChange={onChange}
                  error={!!passwordError}
                  helperText={!!passwordError ? 'Passwords Do not Match!' : ''}
                  InputProps={{
                    classes: {
                      input: classes.resize,
                    },
                  }}
                />
              </Grid>
            )}
          </Grid>
          {click && (
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              <Box fontSize={16}>Reset Password</Box>
            </Button>
          )}
        </form>
      </div>
    </Container>
  );
};

const mapStateToProps = (state, props) => ({
  isAuthenticated: state.auth.isAuthenticated,
  forgotEmail: state.auth.forgotPasswordEmail,
});

export default connect(mapStateToProps)(ForgotPassword);
