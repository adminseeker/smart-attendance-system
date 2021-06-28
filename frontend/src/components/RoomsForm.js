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
const RoomsForm = (props) => {
  const classes = useStyles();

  const [room_name, set_room_name] = useState(
    props.room ? props.room.room_name : ''
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
          {props.room ? 'Edit Room' : 'Create Room'}
        </Typography>
        <Avatar className={classes.avatar}>
          {props.room ? <UpdateIcon /> : <CreateIcon />}
        </Avatar>
        <form
          className={classes.form}
          onSubmit={(e) => {
            e.preventDefault();
            props.onSubmit({ room_name });
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='room_name'
                label='Room Name'
                name='room_name'
                autoComplete='off'
                value={room_name}
                onChange={(e) => {
                  set_room_name(e.target.value);
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
            {props.room ? 'Update' : 'Create'}
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default connect()(RoomsForm);

{
  /* <form onSubmit={(e)=>{e.preventDefault(); if(room_name==""){alert("Empty Room Name!")} else props.onSubmit({room_name})}}> 
<label htmlFor="room_name">Room Name: </label>
<input id="room_name" type="text" value={room_name} onChange={(e)=>{set_room_name(e.target.value)}} />
<input type="submit" value="submit" />
</form> */
}
