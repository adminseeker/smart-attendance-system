import React from 'react';
import { Link } from 'react-router-dom';
import { removeUser } from '../../actions/users';
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
const StudentsListItem = (props) => {
  const classes = useStyles();
  return (
    <TableRow key={props.student.user && props.student.user._id}>
      <TableCell
        scope='row'
        component={Link}
        to={'/attendance/students/' + (props.student && props.student._id)}
      >
        {props.student.usn}
      </TableCell>
      <TableCell align='center'>{props.student.semester}</TableCell>
      <TableCell align='center'>
        {props.student.user && props.student.user.name}
      </TableCell>
      <TableCell align='center'>
        {' '}
        <Button
          size='small'
          className={classes.editButton}
          component={Link}
          to={
            '/edit/students/' + (props.student.user && props.student.user._id)
          }
        >
          Edit
        </Button>
      </TableCell>
      <TableCell align='center'>
        <Button
          size='small'
          className={classes.deleteButton}
          onClick={async () => {
            let msg = await props.dispatch(
              removeUser(props.student.user && props.student.user._id)
            );
            props.dispatch(setAlert(msg, 'success'));
          }}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default connect()(StudentsListItem);
