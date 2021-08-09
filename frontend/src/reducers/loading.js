const initialState = true;

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return true;
    case 'CLEAR_LOADING':
      return false;
    case 'LOGOUT':
      return true;
    default:
      return true;
  }
};

export default loadingReducer;
