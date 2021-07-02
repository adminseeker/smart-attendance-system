import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTeacher } from '../../actions/classes';
import FacebookCircularProgress from '../FacebookCircularProgress';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import CreateIcon from '@material-ui/icons/Create';
import { makeStyles } from '@material-ui/core/styles';
import { setAlert } from '../../actions/alert';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  table: {
    marginTop: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 50,
    maxWidth: '50%',
  },
}));

const TeacherList = ({ teacher, class_id, addTeacher, students, setAlert }) => {
  const classes = useStyles();
  const [clicked, setClicked] = useState(false);
  const [teacherUSN, setTeacherUSN] = useState(teacher ? teacher.usn : '');

  return !students ? (
    <FacebookCircularProgress />
  ) : !teacher ? (
    <div>
      <Typography
        component='h1'
        variant='h2'
        color='primary'
        style={{ textAlign: 'center' }}
      >
        Teacher
      </Typography>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />

        <div className={classes.paper}>
          <Typography
            component='h1'
            variant='h4'
            color='secondary'
            style={{ textAlign: 'center' }}
          >
            Add Teacher
          </Typography>

          <Avatar className={classes.avatar}>
            <CreateIcon />
          </Avatar>
          <form
            className={classes.form}
            onSubmit={async (e) => {
              e.preventDefault();
              if (teacherUSN == '') setAlert('empty EmployeeID!', 'warning');
              else {
                let data = await addTeacher(class_id, teacherUSN);

                data.class_name
                  ? setAlert('Teacher added successfully!!', 'success')
                  : setAlert(data.msg, 'info');
              }
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  id='teacherUSN'
                  label='Employee ID'
                  name='teacherUSN'
                  autoComplete='off'
                  value={teacherUSN}
                  onChange={(e) => {
                    setTeacherUSN(e.target.value);
                  }}
                />
              </Grid>
            </Grid>

            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Add Teacher
            </Button>
          </form>
        </div>
      </Container>
    </div>
  ) : (
    <div>
      <Typography
        component='h1'
        variant='h4'
        color='primary'
        style={{ textAlign: 'center' }}
      >
        Teacher
      </Typography>
      <TableContainer component={Paper} className={classes.table}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Employee Id</TableCell>
              <TableCell align='center'>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{teacher.usn}</TableCell>
              <TableCell align='center'>{teacher.user.name}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {!clicked && (
        <Container component='main' maxWidth='xs'>
          <Button
            fullWidth
            variant='contained'
            color='secondary'
            className={classes.submit}
            onClick={(e) => {
              setClicked(true);
            }}
          >
            Change Teacher
          </Button>
        </Container>
      )}
      {(clicked || !teacher) && (
        <Container component='main' maxWidth='xs'>
          <CssBaseline />

          <div className={classes.paper}>
            <Typography
              component='h1'
              variant='h4'
              color='secondary'
              style={{ textAlign: 'center' }}
            >
              Change Teacher
            </Typography>

            <Avatar className={classes.avatar}>
              <CreateIcon />
            </Avatar>

            <form
              className={classes.form}
              onSubmit={async (e) => {
                e.preventDefault();
                setClicked(false);

                if (teacherUSN == '') setAlert('empty EmployeeID!', 'warning');
                else {
                  let data = await addTeacher(class_id, teacherUSN);

                  data.class_name
                    ? setAlert('Teacher added successfully!!', 'success')
                    : setAlert(data.msg, 'info');
                }
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant='outlined'
                    required
                    fullWidth
                    id='teacherUSN'
                    label='Employee ID'
                    name='teacherUSN'
                    autoComplete='off'
                    value={teacherUSN}
                    onChange={(e) => {
                      setTeacherUSN(e.target.value);
                    }}
                  />
                </Grid>
              </Grid>

              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
              >
                Change Teacher
              </Button>
            </form>
          </div>
        </Container>
      )}
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  teacher: state.users.ClassTeacher,
  students: state.users.ClassStudents,
});

export default connect(mapStateToProps, { addTeacher, setAlert })(TeacherList);
