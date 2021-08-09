import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Header from './Header';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import DescriptionIcon from '@material-ui/icons/Description';
import download from 'downloadjs';
import { Parser } from 'json2csv';

import { setLoading, clearLoading } from '../actions/loading';

import { getStudentReport, clearReport } from '../actions/report';
import { setAlert } from '../actions/alert';

const StudentAttendance = (props) => {
  useEffect(() => {
    if (props.match) {
      props.clearReport();
      props.setLoading();
      props.getStudentReport(props.match && props.match.params.id);
      props.clearLoading();
    }
    // eslint-disable-next-line
  }, []);
  const data = {
    labels:
      props.studentReport &&
      props.studentReport.map((_class) => _class.class_name),
    datasets: [
      {
        label: '# of Total classes',
        data:
          props.studentReport &&
          props.studentReport.map((_class) => _class.total_classes),
        backgroundColor: 'rgb(255, 99, 132)',
      },
      {
        label: '# of Attended classes',
        data:
          props.studentReport &&
          props.studentReport.map((_class) => _class.attend_classes),
        backgroundColor: 'rgb(54, 162, 235)',
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  const genRep = () => {
    const json2csvParser = new Parser();
    const csvStudent = json2csvParser.parse(props.studentReport);
    download(
      csvStudent,
      props.usn + '-Attendance-report-' + Date.now() + '.csv',
      'text/csv'
    );
    setAlert('Successfully Downloaded!!', 'success');
  };

  return (
    <div>
      <Header />
      <div style={{ marginTop: '5rem' }}>
        <Grid container>
          <Grid item xs={12}>
            <Typography
              component='h1'
              variant='h2'
              color='primary'
              style={{ textAlign: 'center' }}
            >
              Student Attendance Analysis
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              component='h1'
              variant='h2'
              color='primary'
              style={{ textAlign: 'center' }}
            >
              <Button
                variant='contained'
                color='primary'
                size='large'
                startIcon={<DescriptionIcon />}
                onClick={() => {
                  if (props.studentReport.length > 0) genRep();
                  else
                    setAlert(
                      'Please Wait till attendance loads!! or You have not enrolled in any class',
                      'warning'
                    );
                }}
              >
                Get Attendance Report
              </Button>
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Grid
              container
              direction='row'
              justifyContent='center'
              alignItems='center'
            >
              <Grid item xs={12} md={6} style={{ marginTop: '5rem' }}>
                <Bar data={data} options={options} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  studentReport: state.report,
  usn: state.auth.user.student
    ? state.auth.user.student.usn
    : state.users.students.filter(
        //eslint-disable-next-line
        (stud) => props.match.params.id == stud._id
      )[0].usn,
  loading: state.buffing,
});

export default connect(mapStateToProps, {
  getStudentReport,
  setLoading,
  clearLoading,
  clearReport,
  setAlert,
})(StudentAttendance);
