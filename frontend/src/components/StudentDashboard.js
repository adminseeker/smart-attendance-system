import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import FacebookCircularProgress from './FacebookCircularProgress';
import StudentAttendance from './StudentAttendance';
import { getStudentReport, clearReport } from '../actions/report';
import { setLoading, clearLoading } from '../actions/loading';

const StudentDashboard = ({
  user,
  loading,

  clearReport,
  getStudentReport,
  studentReport,
  setLoading,
  clearLoading,
}) => {
  useEffect(() => {
    const fun = async () => {
      clearReport();
      setLoading();
      await getStudentReport(user.student._id);
      clearLoading();
    };
    fun();
    //eslint-disable-next-line
  }, []);
  return loading ? (
    <FacebookCircularProgress />
  ) : (
    <StudentAttendance studentReport={studentReport} />
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  loading: state.auth.loading,
  studentReport: state.report,
  buffing: state.buffing,
});

export default connect(mapStateToProps, {
  getStudentReport,
  setLoading,
  clearLoading,
  clearReport,
})(StudentDashboard);
