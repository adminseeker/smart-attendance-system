const defaultClassState = [];

const reportReducer = (state = defaultClassState, action) => {
  switch (action.type) {
    case 'REPORT_ERROR':
      return [...state];
    case 'GET_STUDENT_REPORT':
      return action.studentReport;
    case 'GET_TEACHER_REPORT':
      return action.teacherReport;
    case 'LOGOUT':
      return [];
    case 'CLEAR_REPORT':
      return [];
    default:
      return state;
  }
};

export default reportReducer;
