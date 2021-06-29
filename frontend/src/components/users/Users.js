import React from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../../actions/users';
import { Link } from 'react-router-dom';
import useSWR from 'swr';
import FacebookCircularProgress from '../FacebookCircularProgress';
import Header from '../Header';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
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
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
}));
const Users = ({ getUsers, users }) => {
  const classes = useStyles();

  useSWR('/users/students', () => {
    getUsers();
  });
  return !users ? (
    <FacebookCircularProgress />
  ) : (
    <div>
      <Header />
      <div style={{ marginTop: '5rem' }}>
        <Typography
          component='h1'
          variant='h2'
          color='primary'
          style={{ textAlign: 'center' }}
        >
          Users
        </Typography>
        <Fab
          variant='extended'
          size='small'
          aria-label='add'
          className={classes.margin}
          component={Link}
          to={'/users/add'}
        >
          <AddIcon className={classes.extendedIcon} />
          Add Users
        </Fab>
        <Grid container spacing={2} style={{ margin: 50 }}>
          <Grid item xs={12} md={6} lg={4}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={process.env.PUBLIC_URL + '/images/student-1.jpeg'}
                  title='subject'
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant='h5'
                    component={Link}
                    style={{ textDecoration: 'none' }}
                    color='primary'
                    to={'/users/students'}
                  >
                    Students
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={process.env.PUBLIC_URL + '/images/teacher-1.jpeg'}
                  title='subject'
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant='h5'
                    component={Link}
                    style={{ textDecoration: 'none' }}
                    color='primary'
                    to={'/users/teachers'}
                  >
                    Teachers
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={process.env.PUBLIC_URL + '/images/admin-1.jpeg'}
                  title='subject'
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant='h5'
                    component={Link}
                    style={{ textDecoration: 'none' }}
                    color='primary'
                    to={'/users/admins'}
                  >
                    Admins
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  users: state.users,
});

export default connect(mapStateToProps, { getUsers })(Users);
