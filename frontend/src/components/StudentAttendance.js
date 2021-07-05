import React from 'react';
import { Bar } from 'react-chartjs-2';
import Header from './Header';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { getAttendanceByStudentId } from '../actions/attendance';
import useSWR from 'swr';

const StudentAttendance = (props) => {
  useSWR('/attendance', () => {
    props.getAttendanceByStudentId(props.match.params.id);
  });
  const data = {
    labels:
      props.studentAttendance.classes &&
      props.studentAttendance.classes.map((_class) => _class.class_name),
    datasets: [
      {
        label: '# of Total classes',
        data:
          props.studentAttendance.classes &&
          props.studentAttendance.classes.map((_class) => _class.total_classes),
        backgroundColor: 'rgb(255, 99, 132)',
      },
      {
        label: '# of Attended classes',
        data:
          props.studentAttendance.classes &&
          props.studentAttendance.classes.map(
            (_class) =>
              props.studentAttendance.attendance &&
              props.studentAttendance.attendance.filter(
                // eslint-disable-next-line eqeqeq
                (att) => _class._id == att.class
              ).length
          ),
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
            <Grid
              container
              direction='row'
              justify='center'
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
  studentAttendance: state.attendance,
});

export default connect(mapStateToProps, { getAttendanceByStudentId })(
  StudentAttendance
);
