import React from 'react';
import { editUsers } from '../../actions/users';
import { connect } from 'react-redux';
import UsersForm from './UsersForm';
import Header from '../Header';
import { setAlert } from '../../actions/alert';

const EditAdmins = (props) => {
  return (
    <div>
      <Header />
      <div style={{ marginTop: '5rem' }}>
        <UsersForm
          user={props.admin}
          onSubmit={async (admin) => {
            const res = await props.dispatch(
              editUsers(admin, props.admin.user._id)
            );
            if (res) {
              props.dispatch(
                setAlert('Admin Updated Successfully!', 'success')
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
    admin: state.users.admins.filter(
      (admin) => String(admin.user._id) === String(props.match.params.id)
    )[0],
  };
};

export default connect(mapStateToProps)(EditAdmins);
