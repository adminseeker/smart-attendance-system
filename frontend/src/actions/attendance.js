import axios from 'axios';

const getAttendanceByStudentId = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get('/api/attendance/student/' + id);

      dispatch({
        type: 'GET_STUDENT_ATTENDANCE',
        studentAttendance: res.data,
      });
      return '';
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'ATTENDANCE_ERROR',
      });
    }
  };
};

const getAttendanceByTeacherId = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get('/api/attendance/teacher/' + id);

      dispatch({
        type: 'GET_TEACHER_ATTENDANCE',
        teacherAttendance: res.data,
      });
      return '';
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'ATTENDANCE_ERROR',
      });
    }
  };
};
const getAttendanceByAdminId = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get('/api/attendance/admin/' + id);

      dispatch({
        type: 'GET_ADMIN_ATTENDANCE',
        adminAttendance: res.data,
      });
      return '';
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'ATTENDANCE_ERROR',
      });
    }
  };
};
const getClassAttendanceTeacher = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get('/api/attendance/teacher/' + id + '/classes');

      dispatch({
        type: 'GET_TEACHER_CLASS_ATTENDANCE',
        teacherClassAttendance: res.data,
      });
      return '';
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'ATTENDANCE_ERROR',
      });
    }
  };
};

export {
  getAttendanceByStudentId,
  getAttendanceByTeacherId,
  getAttendanceByAdminId,
  getClassAttendanceTeacher,
};
