import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import FacebookCircularProgress from './FacebookCircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import Login from './Login';
import { CssBaseline } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paperContainer: {
    background: `url(${
      process.env.PUBLIC_URL + '/images/home_background.png'
    }) no-repeat center center fixed`,
    backgroundSize: 'cover',
    height: '100vh',
    overflow: 'hidden',
  },
}));

const Landing = (props) => {
  const classes = useStyles();
  if (props.isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return props.loading ? (
    <FacebookCircularProgress />
  ) : (
    <Fragment>
      <CssBaseline />
      <Hidden smDown>
        <Grid container>
          <Grid item xs={8}>
            <Grid
              container
              direction='column'
              justify='flex-start'
              alignItems='center'
              className={classes.paperContainer}
            >
              <Grid item xs={3}></Grid>

              <Grid item xs={3}>
                <Typography variant='h2' style={{ color: '#fff' }}>
                  SAS
                </Typography>
              </Grid>

              <Grid item xl={3}>
                <Grid item xs={12}>
                  <Typography
                    variant='h4'
                    style={{ color: '#fff', fontFamily: "'Pacifico' ,cursive" }}
                  >
                    Smart Attendance system for educational institutions
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={4}>
            <Login />
          </Grid>
        </Grid>
      </Hidden>
      <Hidden mdUp>
        <Login />
      </Hidden>
    </Fragment>
  );
};
const mapStateToProps = (state, props) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps)(Landing);
