import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeRoom } from '../actions/rooms';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { setAlert } from '../actions/alert';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  editButton: {
    backgroundColor: theme.palette.warning.main,
    textDecoration: 'none',
    '&:hover': {
      backgroundColor: theme.palette.warning.light,
    },
  },
  deleteButton: {
    color: '#fff',
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.light,
    },
  },
}));

const RoomsListItem = (props) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} md={6} lg={4} xl={3}>
      {' '}
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={process.env.PUBLIC_URL + '/images/room-1.jpeg'}
            title='class room'
          />
          <CardContent>
            <Typography
              gutterBottom
              variant='h5'
              component={Link}
              style={{ textDecoration: 'none' }}
              color='primary'
              to={'/room/' + props.room._id + '/timings'}
            >
              {props.room.room_name}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size='small'
            className={classes.editButton}
            component={Link}
            to={'/edit/room/' + props.room._id}
          >
            Edit
          </Button>
          <Button
            size='small'
            className={classes.deleteButton}
            onClick={async () => {
              let msg = await props.dispatch(removeRoom(props.room._id));
              props.dispatch(setAlert(msg, 'success'));
            }}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default connect()(RoomsListItem);
