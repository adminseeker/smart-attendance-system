import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import Header from './Header';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { getAttendanceByTeacherId } from '../actions/attendance';
import useSWR from 'swr';
const TeacherAttendance = (props) => {
  useSWR('/attendance', () => {
    props.getAttendanceByTeacherId(
      props.match.params.id && props.match.params.id
    );
  });
  const random_rgb = () => {
    var o = Math.round,
      r = Math.random,
      s = 255;
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',';
  };
  const colorRGB =
    (props.teacherAttendance.classes &&
      props.teacherAttendance.classes.map(() => random_rgb())) ||
    [];
  const data = {
    labels:
      (props.teacherAttendance.classes &&
        props.teacherAttendance.classes.map((_class) => _class.class_name)) ||
      [],
    datasets: [
      {
        label: '# of Total classes',
        data:
          (props.teacherAttendance.classes &&
            props.teacherAttendance.classes.map(
              (_class) => _class.total_classes
            )) ||
          [],
        backgroundColor:
          (props.teacherAttendance.classes &&
            props.teacherAttendance.classes.map(
              (_class, i) => colorRGB[i] + '0.2)'
            )) ||
          [],
        borderColor:
          (props.teacherAttendance.classes &&
            props.teacherAttendance.classes.map(
              (_class, i) => colorRGB[i] + '1)'
            )) ||
          [],
      },
    ],
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
              Teacher Attendance Analysis
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              direction='row'
              justify='center'
              alignItems='center'
            >
              <Grid item xs={6} md={4} style={{ marginTop: '5rem' }}>
                <Doughnut data={data} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
const mapStateToProps = (state, props) => ({
  teacherAttendance: state.attendance,
});
export default connect(mapStateToProps, { getAttendanceByTeacherId })(
  TeacherAttendance
);
