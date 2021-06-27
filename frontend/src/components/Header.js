import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import { Button } from '@material-ui/core';
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
  }, [props.user.user.role, setMisc, misc]);
  let { _classes, users } = misc;
  return (
    <div className={classes.root}>
      <AppBar position='fixed'>
        <Toolbar>
          <Typography
            style={{ color: 'inherit', textDecoration: 'none' }}
            variant='h6'
            className={classes.title}
            component={Link}
            to='/dashboard'
          >
            SAS
          </Typography>
          {props.isAuthenticated && (
            <div>
              {_classes && (
                <Button
                  component={Link}
                  to='/classes'
                  style={{ color: 'inherit' }}
                >
                  Classes
                </Button>
              )}
              {users && (
                <Button
                  component={Link}
                  to='/users'
                  style={{ color: 'inherit' }}
                >
                  Users
                </Button>
              )}
              <Button style={{ color: 'inherit' }}>Profile</Button>
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
