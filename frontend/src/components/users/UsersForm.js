/* eslint-disable eqeqeq */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';

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
}));

const UsersForm = (props) => {
  const classes = useStyles();
  let ph = props.user ? JSON.stringify(props.user.user.phone) : '';
  const [formData, setFormData] = useState({
    name: props.user ? props.user.user.name : '',
    email: props.user ? props.user.user.email : '',
    password: props.user ? props.user.user.password : '',
    phone: ph,
    role: props.user ? props.user.user.role : '',
    usn: props.user ? props.user.usn : '',
    semester: props.user ? props.user.semester : '',
  });

  const { name, email, password, phone, role, usn, semester } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      name == '' ||
      email == '' ||
      (!props.user && password == '') ||
      phone == '' ||
      role == '' ||
      (role !== 'admin' && usn == '') ||
      (semester == '' && role == 'student')
    ) {
      props.dispatch(setAlert('Invalid field!!', 'warning'));
    }

    const regexp = /\d{10}/;
    const arr = regexp.exec(phone);

    if (arr === null || phone.length !== 10)
      props.dispatch(
        setAlert('Please enter 10 digit mobile number!!', 'warning')
      );
    else {
      if (!props.user) {
        props.onSubmit(formData);
      } else {
        const updatedItems = {};
        if (props.user.user.name !== name) updatedItems.name = name;
        if (props.user.user.email !== email) updatedItems.email = email;
        if (props.user.user.phone !== phone) updatedItems.phone = phone;
        if (props.user.user.role !== role) updatedItems.role = role;
        if (props.user.usn !== usn) updatedItems.usn = usn;
        if (props.user.semester !== semester) updatedItems.semester = semester;
        props.onSubmit(updatedItems);
      }
    }
  };
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountBoxIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          {props.user ? 'Edit User' : 'Add User'}
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
                onChange={onChange}
                value={email}
              />
            </Grid>
            {!props.user && (
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  type='password'
                  id='password'
                  label='Password'
                  name='password'
                  autoComplete='off'
                  onChange={onChange}
                  value={password}
                />
              </Grid>
            )}
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
                onChange={onChange}
                value={role}
              />
            </Grid>
            {role == 'student' && (
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  id='semester'
                  label='Semester'
                  name='semester'
                  autoComplete='off'
                  onChange={onChange}
                  value={semester}
                />
              </Grid>
            )}
            {(role == 'student' || role == 'teacher') && (
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  id='usn'
                  label={
                    role == 'student'
                      ? 'USN'
                      : role == 'teacher' && 'Employee ID'
                  }
                  name='usn'
                  onChange={onChange}
                  autoComplete='off'
                  value={usn}
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
            {props.user ? 'Update' : 'Add'}
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default connect()(UsersForm);
