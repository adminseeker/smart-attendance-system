const defaultTimingState = [];
const timingReducer = (state = defaultTimingState, action) => {
  switch (action.type) {
    case 'GET_TIMINGS':
      return action.timings;
    case 'TIMINGS_ERROR':
      return { ...state };
    case 'LOGOUT':
      return [];
    default:
      return state;
  }
};

export default timingReducer;
