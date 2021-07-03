/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getTimingsbyid } from '../../actions/timings';
import Header from '../Header';
import { Link } from 'react-router-dom';
import TimingItem from './TimingItem';
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
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
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

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 50,
    maxWidth: '50%',
  },
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
const RoomDayTimes = ({ getTimingsbyid, timings, match }) => {
  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  let { id, day } = match.params;
  useEffect(() => {
    getTimingsbyid(id);
  }, [getTimingsbyid, id]);

  const [dayTimings, setDayTimings] = useState([]);

  useEffect(() => {
    setDayTimings(timings && timings.filter(({ timing }) => timing.day == day));
  }, [timings, day]);
  const emptyRows = dayTimings
    ? rowsPerPage -
      Math.min(rowsPerPage, dayTimings.length - page * rowsPerPage)
    : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return dayTimings.length === 0 ? (
    <div>
      <Header />
      <div style={{ marginTop: '5rem' }}>
        <Typography
          component='h1'
          variant='h2'
          color='primary'
          style={{ textAlign: 'center' }}
        >
          Timings
        </Typography>
        <Fab
          variant='extended'
          size='small'
          aria-label='add'
          className={classes.margin}
          component={Link}
          to={`/add/room/${id}/${day}/timings`}
        >
          <AddIcon className={classes.extendedIcon} />
          Add Timings
        </Fab>
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
            Timings
          </Typography>
          <Fab
            variant='extended'
            size='small'
            aria-label='add'
            className={classes.margin}
            component={Link}
            to={`/add/room/${id}/${day}/timings`}
          >
            <AddIcon className={classes.extendedIcon} />
            Add Timings
          </Fab>{' '}
          <TableContainer component={Paper} className={classes.table}>
            <Table aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Class Name</TableCell>
                  <TableCell align='center'>Start time</TableCell>
                  <TableCell align='center'>End time</TableCell>
                  <TableCell align='center'>Edit</TableCell>
                  <TableCell align='center'>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? dayTimings.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : dayTimings
                ).map(({ timing }) => (
                  <TimingItem
                    key={timing._id}
                    timing={timing}
                    room_id={id}
                    day={day}
                  />
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
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
                    count={dayTimings.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { 'aria-label': 'rows per page' },
                      native: true,
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state, props) => ({
  timings: state.timings,
});

export default connect(mapStateToProps, { getTimingsbyid })(RoomDayTimes);
