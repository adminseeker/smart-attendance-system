/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getClassStudents } from '../actions/classes';
import useSWR from 'swr';
import Header from './Header';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { v4 } from 'uuid';

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label='first page'
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label='previous page'
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='next page'
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='last page'
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

const useStyles = makeStyles({
  table: {
    marginTop: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 50,
    maxWidth: '50%',
  },
});

const TeacherAttClassStudents = ({
  ClassStudents,
  getClassStudents,
  teacherClassAttendance,
  match,
  _class,
}) => {
  const classes = useStyles();

  useSWR('/classes/attendance', () => {
    getClassStudents(match.params.id);
  });
  let [studentTotalData, setStudentTotalData] = useState([]);
  let data = {};
  useEffect(() => {
    setStudentTotalData(
      ClassStudents &&
        ClassStudents.map((student) => {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          data = {};
          data.name = student.student.user.name;
          data.usn = student.student.usn;
          data.total_classes = _class.total_classes;
          data.attend = teacherClassAttendance.filter(
            (st) => st.student == student.student._id
          ).length;
          return data;
        })
    );
  }, [ClassStudents]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = studentTotalData
    ? rowsPerPage -
      Math.min(rowsPerPage, studentTotalData.length - page * rowsPerPage)
    : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div>
      <Header />
      <div style={{ marginTop: '5rem' }}>
        <Typography
          component='h1'
          variant='h2'
          color='primary'
          style={{ textAlign: 'center' }}
        >
          Students
        </Typography>
        {studentTotalData && (
          <TableContainer component={Paper} className={classes.table}>
            <Table aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>USN</TableCell>
                  <TableCell align='center'>Name</TableCell>
                  <TableCell align='center'>Total Classes</TableCell>
                  <TableCell align='center'>Attended</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? studentTotalData.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : studentTotalData
                ).map((student) => (
                  <TableRow>
                    <TableCell>{student.usn}</TableCell>

                    <TableCell align='center'>{student.name}</TableCell>
                    <TableCell align='center'>
                      {student.total_classes}
                    </TableCell>
                    <TableCell align='center'>{student.attend}</TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }} key={v4()}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: 'All', value: -1 },
                    ]}
                    colSpan={3}
                    count={studentTotalData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { 'aria-label': 'rows per page' },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  teacherClassAttendance: state.attendance.attendance.filter(
    (val) => val.class == props.match.params.id
  ),
  ClassStudents: state.users.ClassStudents,
  _class: state.attendance.classes.filter(
    (val) => val._id == props.match.params.id
  )[0],
});

export default connect(mapStateToProps, { getClassStudents })(
  TeacherAttClassStudents
);
