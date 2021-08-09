/* eslint-disable eqeqeq */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getClasses } from '../actions/classes';
import { setAlert } from '../actions/alert';
import { setLoading } from '../actions/loading';

import download from 'downloadjs';
import { Parser } from 'json2csv';
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

const ClassesList = ({
  _classes,
  $classes,
  getClasses,
  NoAddOption,
  teacherReport,
  setAlert,
  setLoading,
  loading,
}) => {
  const classes = useStyles();
  useSWR('/classes', () => {
    !NoAddOption && getClasses();
  });
  const genRep = async () => {
    setLoading();
    const json2csvParser = new Parser();
    let csvTeacher;
    if (teacherReport.length > 0) {
      csvTeacher = json2csvParser.parse(teacherReport);
    } else {
      csvTeacher = 'No Data Found';
    }
    download(
      csvTeacher,
      'Attendance-report-' + Date.now() + '.csv',
      'text/csv'
    );
    await setAlert('Successfully downloaded!!', 'success');
  };
  useEffect(() => {
    if (!loading) {
      genRep();
    }
    //eslint-disable-next-line
  }, [loading]);

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
                  // genRep={genRep}
                />
              ))}
            {$classes &&
              $classes.map((_class) => (
                <ClassesListItem
                  key={_class._id}
                  _class={_class}
                  NoAddOption={true}
                  // genRep={genRep}
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
  teacherReport: state.report,
  loading: state.buffing,
  alert: state.alert,
});

export default connect(mapStateToProps, {
  getClasses,
  setAlert,
  setLoading,
})(ClassesList);
