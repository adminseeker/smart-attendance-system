import React from 'react';
import UsersForm from './UsersForm';
import { addUser } from '../../actions/users';
import { connect } from 'react-redux';
import Header from '../Header';
import { setAlert } from '../../actions/alert';
const AddUsers = (props) => {
  return (
    <div>
      <Header />
      <div style={{ marginTop: '5rem' }}>
        <UsersForm
          onSubmit={async (user) => {
            const res = await props.dispatch(addUser(user));
            if (res.msg) {
              props.dispatch(setAlert(res.msg, 'success'));
            }
            props.history.push('/users');
          }}
        />
      </div>
    </div>
  );
};

export default connect()(AddUsers);
