import React from 'react';
import { removeStudent } from '../../actions/classes';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import { setAlert } from '../../actions/alert';
const useStyles = makeStyles((theme) => ({
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
    <TableRow
      key={props.student.student.user && props.student.student.user._id}
    >
      <TableCell component='th' scope='row'>
        {props.student.student.usn}
      </TableCell>
      <TableCell align='center'>{props.student.student.semester}</TableCell>
      <TableCell align='center'>
        {props.student.student.user && props.student.student.user.name}
      </TableCell>

      <TableCell align='center'>
        <Button
          size='small'
          className={classes.deleteButton}
          onClick={async () => {
            let msg = await props.removeStudent(
              props.class_id,
              props.student.student._id
            );
            props.setAlert(msg, 'success');
          }}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};
const mapStateToProps = (state, props) => ({});

export default connect(mapStateToProps, { removeStudent, setAlert })(
  StudentsListItem
);
