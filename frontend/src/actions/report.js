import axios from 'axios';

const getStudentReport = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get('/api/attendance/student/report/' + id);

      dispatch({
        type: 'GET_STUDENT_REPORT',
        studentReport: res.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'REPORT_ERROR',
      });
    }
  };
};

const getTeacherReport = (id1, id2) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        '/api/attendance/teacher/report/' + id1 + '/' + id2
      );

      await dispatch({
        type: 'GET_TEACHER_REPORT',
        teacherReport: res.data,
      });

      return 'successfully downloaded';
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'REPORT_ERROR',
      });
    }
  };
};

const clearReport = () => {
  return (dispatch) => {
    dispatch({ type: 'CLEAR_REPORT' });
  };
};
export { getStudentReport, getTeacherReport, clearReport };
