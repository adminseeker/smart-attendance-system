import React from 'react';
import { Link } from 'react-router-dom';
import { removeClass } from '../actions/classes';
import { getTeacherReport } from '../actions/report';
import { connect } from 'react-redux';
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
import { setLoading, clearLoading } from '../actions/loading';

import DescriptionIcon from '@material-ui/icons/Description';

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

const ClassesListItem = (props) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} md={6} lg={4} xl={3}>
      {' '}
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={process.env.PUBLIC_URL + '/images/class-1.jpeg'}
            title='subject'
          />
          <CardContent>
            <Typography
              gutterBottom
              variant='h5'
              component={Link}
              style={{ textDecoration: 'none' }}
              color='primary'
              to={
                !props.NoAddOption
                  ? '/class/' + props._class._id + '/users'
                  : '/attendance/class/' + props._class._id + '/students'
              }
            >
              {props._class.class_name}
            </Typography>
          </CardContent>
        </CardActionArea>{' '}
        <CardActions>
          {!props.NoAddOption && (
            <>
              <Button
                size='small'
                className={classes.editButton}
                component={Link}
                to={'/edit/class/' + props._class._id}
              >
                Edit
              </Button>
              <Button
                size='small'
                className={classes.deleteButton}
                onClick={async () => {
                  let msg = await props.dispatch(removeClass(props._class._id));
                  props.dispatch(setAlert(msg, 'success'));
                }}
              >
                Delete
              </Button>
            </>
          )}
          <Button
            size='small'
            variant='contained'
            color='primary'
            startIcon={<DescriptionIcon />}
            onClick={async () => {
              props.dispatch(setLoading());
              await props.dispatch(
                getTeacherReport(props._class.teacher, props._class._id)
              );
              props.dispatch(clearLoading());
            }}
          >
            Get Report
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default connect()(ClassesListItem);
