import React, { useState } from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { setAlert } from '../actions/alert';
import { Link } from 'react-router-dom';
import { updateAccount } from '../actions/auth';
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
    backgroundColor: theme.palette.info.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.info.light,
    },
  },
  reset: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.palette.warning.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.warning.light,
    },
  },
}));
const Profile = (props) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    email: props.user.user.email,
    name: props.user.user.name,
    phone: props.user.user.phone,
    role: props.user.user.role,
    usn: props.user.student
      ? props.user.student.usn
      : props.user.teacher
      ? props.user.teacher.usn
      : '',
    semester: props.user.student ? props.user.student.semester : '',
  });
  const { email, name, phone, role, usn, semester } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const regexp = /\d{10}/;
      const arr = regexp.exec(phone);

      if (arr === null || phone.length !== 10)
        props.dispatch(
          setAlert('Please enter 10 digit mobile number!!', 'warning')
        );
      else {
        const res = await props.dispatch(updateAccount({ name, phone }));
        if (res) {
          props.dispatch(setAlert('Profile updated successfully!!', 'success'));
          props.history.push('/');
        }
      }
    } catch (error) {
      props.dispatch(setAlert('Profile updation failed!!!', 'error'));
      props.history.push('/');
    }
  };
  return (
    <div>
      <Header />
      <div style={{ marginTop: '5rem' }}>
        <Container component='main' maxWidth='xs'>
          <CssBaseline />

          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <AccountBoxIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Profile
            </Typography>
            <form className={classes.form} onSubmit={onSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant='outlined'
                    required
                    fullWidth
                    type='email'
                    id='email'
                    label='Email Address'
                    name='email'
                    autoComplete='off'
                    value={email}
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant='outlined'
                    required
                    fullWidth
                    id='name'
                    label='Name'
                    name='name'
                    autoComplete='off'
                    value={name}
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant='outlined'
                    required
                    type='tel'
                    fullWidth
                    id='phone'
                    label='Phone'
                    name='phone'
                    autoComplete='off'
                    value={phone}
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant='outlined'
                    required
                    fullWidth
                    id='role'
                    label='Role'
                    name='role'
                    autoComplete='off'
                    value={role}
                    disabled
                  />
                </Grid>
                {semester && (
                  <Grid item xs={12}>
                    <TextField
                      variant='outlined'
                      required
                      fullWidth
                      id='semester'
                      label='Semester'
                      name='semester'
                      autoComplete='off'
                      value={semester}
                      disabled
                    />
                  </Grid>
                )}
                {usn && (
                  <Grid item xs={12}>
                    <TextField
                      variant='outlined'
                      required
                      fullWidth
                      id='usn'
                      label={props.user.student ? 'USN' : 'Employee ID'}
                      name='usn'
                      autoComplete='off'
                      value={usn}
                      disabled
                    />
                  </Grid>
                )}
              </Grid>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                className={classes.submit}
              >
                Update Profile
              </Button>
              <Button
                component={Link}
                fullWidth
                variant='contained'
                className={classes.reset}
                to='/changepassword'
              >
                Reset Password
              </Button>
            </form>
          </div>
        </Container>
      </div>
    </div>
  );
};
const mapStateToProps = (state, props) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Profile);
