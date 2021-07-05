/* eslint-disable eqeqeq */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getClasses } from '../actions/classes';

import useSWR from 'swr';
import ClassesListItem from './ClassesListItem';
import Header from './Header';
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

const ClassesList = ({ _classes, $classes, getClasses, NoAddOption }) => {
  const classes = useStyles();
  useSWR('/classes', () => {
    !NoAddOption && getClasses();
  });
  return _classes.length == 0 && ($classes && $classes.length) == 0 ? (
    <div>
      <Header />
      <div style={{ marginTop: '5rem' }}>
        <div style={{ textAlign: 'center' }}>
          <Typography
            component='h1'
            variant='h2'
            color='primary'
            style={{ textAlign: 'center' }}
          >
            No Classes
          </Typography>
          {!NoAddOption && (
            <Fab
              variant='extended'
              size='small'
              aria-label='add'
              className={classes.margin}
              component={Link}
              to={'/add/class'}
            >
              <AddIcon className={classes.extendedIcon} />
              Create Class
            </Fab>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div>
      <Header />
      <div style={{ marginTop: '5rem' }}>
        <div>
          <Typography
            component='h1'
            variant='h2'
            color='primary'
            style={{ textAlign: 'center' }}
          >
            Classes
          </Typography>
          {!NoAddOption && (
            <Fab
              variant='extended'
              size='small'
              aria-label='add'
              className={classes.margin}
              component={Link}
              to={'/add/class'}
            >
              <AddIcon className={classes.extendedIcon} />
              Create Class
            </Fab>
          )}
          <Grid container spacing={2} style={{ margin: 50 }}>
            {_classes &&
              _classes.map((_class) => (
                <ClassesListItem
                  key={_class._id}
                  _class={_class}
                  NoAddOption={false}
                />
              ))}
            {$classes &&
              $classes.map((_class) => (
                <ClassesListItem
                  key={_class._id}
                  _class={_class}
                  NoAddOption={true}
                />
              ))}
          </Grid>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  _classes: state.classes,
});

export default connect(mapStateToProps, { getClasses })(ClassesList);
