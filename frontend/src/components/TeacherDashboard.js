import React from 'react';
import { connect } from 'react-redux';
import FacebookCircularProgress from './FacebookCircularProgress';
import { getAttendanceByTeacherId } from '../actions/attendance';
import useSWR from 'swr';
import TeacherAttendance from './TeacherAttendance';

const TeacherDashboard = ({
  user,
  loading,
  teacherAttendance,
  getAttendanceByTeacherId,
}) => {
  useSWR('/attendance', () => {
    getAttendanceByTeacherId(user.teacher._id);
  });
  return loading ? (
    <FacebookCircularProgress />
  ) : (
    <TeacherAttendance teacherAttendance={teacherAttendance} />
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  loading: state.auth.loading,
  teacherAttendance: state.attendance,
});

export default connect(mapStateToProps, { getAttendanceByTeacherId })(
  TeacherDashboard
);
