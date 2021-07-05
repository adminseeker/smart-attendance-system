/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import { Button, Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const LogOut = () => {
    props.logout();
  };
  let [misc, setMisc] = useState({ _classes: false, users: false });
  useEffect(() => {
    if (props.user.user.role == 'admin')
      setMisc({ ...misc, _classes: true, users: true });
    if (props.user.user.role == 'teacher') setMisc({ ...misc, _classes: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.user.user.role, setMisc]);
  let { _classes, users } = misc;
  return (
    <div className={classes.root}>
      <AppBar position='fixed'>
        <Toolbar>
          <Avatar
            alt='SAS'
            src={process.env.PUBLIC_URL + '/logo512.png'}
            className={classes.large}
          />
          <Typography
            style={{ color: 'inherit', textDecoration: 'none' }}
            className={classes.title}
            component={Link}
            to='/dashboard'
          >
            SAS
          </Typography>
          {props.isAuthenticated && (
            <div>
              {_classes &&
                (props.user.user.role == 'admin' ? (
                  <Button
                    component={Link}
                    to='/classes'
                    style={{ color: 'inherit' }}
                  >
                    Classes
                  </Button>
                ) : (
                  <Button
                    component={Link}
                    to={'/attendance/classes/' + props.user.teacher._id}
                    style={{ color: 'inherit' }}
                  >
                    Classes
                  </Button>
                ))}
              {users && (
                <Button
                  component={Link}
                  to='/users'
                  style={{ color: 'inherit' }}
                >
                  Users
                </Button>
              )}
              <Button
                style={{ color: 'inherit' }}
                component={Link}
                to='/profile'
              >
                Profile
              </Button>
              <Button style={{ color: 'inherit' }} onClick={LogOut}>
                Logout
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});
export default connect(mapStateToProps, { logout })(Header);
