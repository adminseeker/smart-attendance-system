/* eslint-disable eqeqeq */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRooms } from '../actions/rooms';
import useSWR from 'swr';
import RoomsListItem from './RoomsListItem';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.success.dark,
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.success.light,
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const RoomsList = ({ rooms, getRooms }) => {
  const classes = useStyles();
  useSWR('/dashboard', () => {
    getRooms();
  });
  return Object.keys(rooms).length == 0 ? (
    <div style={{ textAlign: 'center' }}>
      <Typography
        component='h1'
        variant='h2'
        color='primary'
        style={{ textAlign: 'center' }}
      >
        No Rooms
      </Typography>
      <Fab
        variant='extended'
        size='small'
        aria-label='add'
        className={classes.margin}
        component={Link}
        to={'/add/room'}
      >
        <AddIcon className={classes.extendedIcon} />
        Create Room
      </Fab>
    </div>
  ) : (
    <div>
      <Typography
        component='h1'
        variant='h2'
        color='primary'
        style={{ textAlign: 'center' }}
      >
        Rooms
      </Typography>
      <Fab
        variant='extended'
        size='small'
        aria-label='add'
        className={classes.margin}
        component={Link}
        to={'/add/room'}
      >
        <AddIcon className={classes.extendedIcon} />
        Create Room
      </Fab>
      <Grid container spacing={2} style={{ margin: 50 }}>
        {rooms &&
          rooms.map((room) => <RoomsListItem key={room._id} room={room} />)}
      </Grid>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  rooms: state.rooms,
});

export default connect(mapStateToProps, { getRooms })(RoomsList);
