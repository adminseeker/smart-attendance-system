import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { removeTiming } from '../../actions/timings';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import { setAlert } from '../../actions/alert';
const useStyles = makeStyles((theme) => ({
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
const TimingItem = (props) => {
  const classes = useStyles();
  let { timing, room_id, day } = props;
  let date = moment(timing.start_time);
  let start_time = date.utc().format('hh:mm A');
  date = moment(timing.end_time);
  let end_time = date.utc().format('hh:mm A');
  return (
    <TableRow key={timing && timing._id}>
      <TableCell component='th' scope='row' align='center'>
        {timing.class && timing.class.class_name}
      </TableCell>
      <TableCell align='center'>{start_time}</TableCell>
      <TableCell align='center'>{end_time}</TableCell>
      <TableCell align='center'>
        {' '}
        <Button
          size='small'
          className={classes.editButton}
          component={Link}
          to={`/edit/room/${room_id}/${day}/timings/${timing._id}`}
        >
          Edit
        </Button>
      </TableCell>
      <TableCell align='center'>
        <Button
          size='small'
          className={classes.deleteButton}
          onClick={async () => {
            let msg = await props.dispatch(removeTiming(timing._id, room_id));
            props.dispatch(setAlert(msg, 'success'));
          }}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default connect()(TimingItem);
