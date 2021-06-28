import React from 'react';
import UsersForm from './UsersForm';
import { addUser } from '../../actions/users';
import { connect } from 'react-redux';
import Header from '../Header';

const AddUsers = (props) => {
  return (
    <div>
      <Header />
      <div style={{ marginTop: '5rem' }}>
        <UsersForm
          onSubmit={async (user) => {
            await props.dispatch(addUser(user));
            props.history.push('/users');
          }}
        />
      </div>
    </div>
  );
};

export default connect()(AddUsers);
