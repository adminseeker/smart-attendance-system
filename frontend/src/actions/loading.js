const setLoading = () => {
  return (dispatch) => {
    dispatch({ type: 'SET_LOADING' });
  };
};
const clearLoading = () => {
  return (dispatch) => {
    dispatch({ type: 'CLEAR_LOADING' });
  };
};

export { setLoading, clearLoading };
