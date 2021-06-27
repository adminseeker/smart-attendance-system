import axios from 'axios';

const getTimingsbyid = (roomId) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.get('/api/rooms/' + roomId + '/timings', config);
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
const addTiming = (timing, roomId) => {
  return async (dispatch) => {
    try {
      const body = JSON.stringify(timing);
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.post(
        '/api/rooms/' + roomId + '/timing',
        body,
        config
      );
      await dispatch(getTimingsbyid(roomId));
      return res.data;
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'TIMINGS_ERROR',
      });
    }
  };
};

const editTiming = (timing, id, roomId) => {
  return async (dispatch) => {
    try {
      const body = JSON.stringify(timing);
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await axios.patch('/api/rooms/timings/' + id, body, config);
      await dispatch(getTimingsbyid(roomId));
      return res.data;
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'TIMINGS_ERROR',
      });
    }
  };
};

const removeTiming = (id, roomId) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.delete(
        '/api/rooms/' + roomId + '/timings/' + id,
        config
      );
      console.log(res.data);
      await dispatch(getTimingsbyid(roomId));
      return res.data.msg;
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'TIMINGS_ERROR',
      });
    }
  };
};

export { getTimingsbyid, addTiming, editTiming, removeTiming };
