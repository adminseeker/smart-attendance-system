const defaultClassState = {};

const attendanceReducer = (state = defaultClassState, action) => {
  switch (action.type) {
    case 'ATTENDANCE_ERROR':
      return {
        ...state,
      };
    case 'GET_STUDENT_ATTENDANCE':
      return action.studentAttendance;
    case 'GET_TEACHER_ATTENDANCE':
      return action.teacherAttendance;
    case 'GET_ADMIN_ATTENDANCE':
      return action.adminAttendance;
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};

export default attendanceReducer;
