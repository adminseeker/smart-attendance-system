import React from 'react';
import { editUsers } from '../../actions/users';
import { connect } from 'react-redux';
import UsersForm from './UsersForm';
import Header from '../Header';
import { setAlert } from '../../actions/alert';

const EditTeachers = (props) => {
  return (
    <div>
      <Header />
      <div style={{ marginTop: '5rem' }}>
        <UsersForm
          user={props.teacher}
          onSubmit={async (teacher) => {
            const res = await props.dispatch(
              editUsers(teacher, props.teacher.user._id)
            );

            if (res) {
              props.dispatch(
                setAlert('Teacher Updated Successfully!', 'success')
              );
            }
            props.history.push('/users');
          }}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    teacher: state.users.teachers.filter(
      (teacher) => String(teacher.user._id) === String(props.match.params.id)
    )[0],
  };
};

export default connect(mapStateToProps)(EditTeachers);
