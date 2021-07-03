import axios from 'axios';

const addRoom = (room) => {
  return async (dispatch) => {
    try {
      const body = JSON.stringify(room);
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.post('/api/rooms/', body, config);
      await dispatch(getRooms());
      return res.data;
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'ROOMS_ERROR',
      });
    }
  };
};

const getRooms = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('/api/rooms');
      dispatch({
        type: 'GET_ROOMS',
        rooms: res.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'ROOMS_ERROR',
      });
    }
  };
};

const editRoom = (room, id) => {
  return async (dispatch) => {
    try {
      const body = JSON.stringify(room);
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await axios.patch('/api/rooms/' + id + '/name', body, config);

      await dispatch(getRooms());
      return res.data;
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'ROOMS_ERROR',
      });
    }
  };
};

const removeRoom = (id) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.delete('/api/rooms/' + id, config);
      await dispatch(getRooms());
      return res.data.msg;
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'ROOMS_ERROR',
      });
    }
  };
};

export { getRooms, editRoom, removeRoom, addRoom };
