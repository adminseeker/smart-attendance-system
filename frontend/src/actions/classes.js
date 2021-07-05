import axios from 'axios';

const addClass = (_class) => {
  return async (dispatch) => {
    try {
      const body = JSON.stringify({ class_name: _class.class_name });
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.post('/api/classes/', body, config);
      await dispatch(getClasses());
      return res.data;
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'CLASSES_ERROR',
      });
    }
  };
};

const addStudents = (id, usn) => {
  return async (dispatch) => {
    try {
      usn = usn.trim().split(',');
      const body = JSON.stringify({ students: usn });
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.post(
        '/api/classes/' + id + '/students/usn',
        body,
        config
      );
      await dispatch(getClassUsers(id));
      return res.data;
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'CLASSES_ERROR',
      });
    }
  };
};

const addTeacher = (id, usn) => {
  return async (dispatch) => {
    try {
      const body = JSON.stringify({ usn: usn });
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.post(
        '/api/classes/' + id + '/teacher/usn',
        body,
        config
      );
      await dispatch(getClassUsers(id));
      return res.data;
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'CLASSES_ERROR',
      });
    }
  };
};

const getClasses = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('/api/classes');

      dispatch({
        type: 'GET_CLASSES',
        classes: res.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'CLASSES_ERROR',
      });
    }
  };
};

const getClassUsers = (id) => {
  return async (dispatch) => {
    try {
      const ClassStudents = await axios.get('/api/classes/' + id + '/students');
      const ClassTeacher = await axios.get('/api/classes/' + id + '/teacher');
      let users = {
        ClassStudents: ClassStudents.data,
        ClassTeacher: ClassTeacher.data,
      };
      dispatch({
        type: 'GET_USERS',
        users,
      });
      return '';
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'USERS_ERROR',
      });
    }
  };
};

const getClassStudents = (id) => {
  return async (dispatch) => {
    try {
      const ClassStudents = await axios.get(
        '/api/classes/' + id + '/students/teacher'
      );

      let users = {
        ClassStudents: ClassStudents.data,
      };
      dispatch({
        type: 'GET_USERS',
        users,
      });
      return '';
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'USERS_ERROR',
      });
    }
  };
};

const editClasses = (_class, id) => {
  return async (dispatch) => {
    try {
      const body = JSON.stringify({ class_name: _class.class_name });
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.patch(
        '/api/classes/' + id + '/name',
        body,
        config
      );

      await dispatch(getClasses());
      return res.data;
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'CLASSES_ERROR',
      });
    }
  };
};

const removeClass = (id) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.delete('/api/classes/' + id, config);
      await dispatch(getClasses());
      return res.data.msg;
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'CLASSES_ERROR',
      });
    }
  };
};

const removeStudent = (class_id, student_id) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await axios.delete(
        '/api/classes/' + class_id + '/student/' + student_id,
        config
      );

      await dispatch(getClassUsers(class_id));
      return res.data.msg;
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'USERS_ERROR',
      });
    }
  };
};

const removeTeacher = (class_id, teacher_id) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await axios.delete(
        '/api/classes/' + class_id + '/teacher/' + teacher_id,
        config
      );

      await dispatch(getClassUsers(class_id));
      return res.data.msg;
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'USERS_ERROR',
      });
    }
  };
};

export {
  addStudents,
  addTeacher,
  getClasses,
  editClasses,
  removeClass,
  addClass,
  removeStudent,
  getClassUsers,
  removeTeacher,
  getClassStudents,
};
