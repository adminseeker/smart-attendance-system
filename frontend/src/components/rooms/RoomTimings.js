import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../Header';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import ScheduleIcon from '@material-ui/icons/Schedule';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
}));

const RoomTimings = (props) => {
  const days = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];
  const classes = useStyles();

  return (
    <div>
      <Header />
      <div style={{ marginTop: '5rem' }}>
        {' '}
        <Typography
          component='h1'
          variant='h2'
          color='primary'
          style={{ textAlign: 'center' }}
        >
          Days
        </Typography>
        <Grid container spacing={2} style={{ margin: 50 }}>
          {days.map((day, i) => {
            return (
              <Grid key={i} item xs={12} md={6} lg={3}>
                {' '}
                <Card className={classes.root}>
                  <CardActionArea
                    component={Link}
                    to={`/room/${props.match.params.id}/timings/${i}`}
                  >
                    <CardMedia
                      className={classes.media}
                      image={process.env.PUBLIC_URL + `/images/${day}-1.jpeg`}
                      title={day}
                    />
                    <CardContent>
                      <p>
                        {' '}
                        <ScheduleIcon />
                      </p>

                      <Typography
                        gutterBottom
                        variant='h5'
                        style={{ textDecoration: 'none' }}
                        color='primary'
                      >
                        Time Table
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
};
const mapStateToProps = (state, props) => ({});

export default connect(mapStateToProps, {})(RoomTimings);
