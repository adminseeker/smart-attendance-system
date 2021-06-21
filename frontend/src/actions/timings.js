import axios from 'axios';

const getTimingsbyid = (id) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.get('/api/rooms/' + id + '/timings', config);
      let timings = res.data;
      dispatch({
        type: 'GET_TIMINGS',
        timings,
      });
      return '';
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'TIMINGS_ERROR',
      });
    }
  };
};

export { getTimingsbyid };
