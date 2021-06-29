import React, { useState } from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import CreateIcon from '@material-ui/icons/Create';
import UpdateIcon from '@material-ui/icons/Update';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
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
const ClassesForm = (props) => {
  const classes = useStyles();
  const [class_name, set_class_name] = useState(
    props._class ? props._class.class_name : ''
  );
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography
          component='h1'
          variant='h2'
          color='primary'
          style={{ textAlign: 'center' }}
        >
          {props._class ? 'Edit Room' : 'Create Room'}
        </Typography>
        <Avatar className={classes.avatar}>
          {props._class ? <UpdateIcon /> : <CreateIcon />}
        </Avatar>
        <form
          className={classes.form}
          onSubmit={(e) => {
            e.preventDefault();
            props.onSubmit({ class_name });
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='class_name'
                label='Class Name'
                name='class_name'
                autoComplete='off'
                value={class_name}
                onChange={(e) => {
                  set_class_name(e.target.value);
                }}
              />
            </Grid>
          </Grid>

          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            {props._class ? 'Update' : 'Create'}
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default connect()(ClassesForm);
