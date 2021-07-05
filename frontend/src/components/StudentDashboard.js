import React from 'react';
import { connect } from 'react-redux';
import FacebookCircularProgress from './FacebookCircularProgress';
import StudentAttendance from './StudentAttendance';
import { getAttendanceByStudentId } from '../actions/attendance';
import useSWR from 'swr';

const StudentDashboard = ({
  user,
  loading,
  getAttendanceByStudentId,
  studentAttendance,
}) => {
  useSWR('/attendance', () => {
    getAttendanceByStudentId(user.student._id);
  });
  return loading ? (
    <FacebookCircularProgress />
  ) : (
    <StudentAttendance studentAttendance={studentAttendance} />
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  loading: state.auth.loading,
  studentAttendance: state.attendance,
});

export default connect(mapStateToProps, { getAttendanceByStudentId })(
  StudentDashboard
);
