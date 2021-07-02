import React from 'react';
import { editUsers } from '../../actions/users';
import { connect } from 'react-redux';
import UsersForm from './UsersForm';
import Header from '../Header';
import { setAlert } from '../../actions/alert';

const EditStudents = (props) => {
  return (
    <div>
      <Header />
      <div style={{ marginTop: '5rem' }}>
        <UsersForm
          user={props.student}
          onSubmit={async (student) => {
            const res = await props.dispatch(
              editUsers(student, props.student.user._id)
            );
            if (res) {
              props.dispatch(
                setAlert('Student Updated Successfully!', 'success')
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
    student: state.users.students.filter(
      (student) => String(student.user._id) === String(props.match.params.id)
    )[0],
  };
};

export default connect(mapStateToProps)(EditStudents);
