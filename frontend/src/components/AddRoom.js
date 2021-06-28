import React from 'react';
import RoomsForm from './RoomsForm';
import { addRoom } from '../actions/rooms';
import { connect } from 'react-redux';
import Header from './Header';

const AddRoom = (props) => {
  return (
    <div>
      <Header />
      <div style={{ marginTop: '5rem' }}>
        <RoomsForm
          onSubmit={async (room) => {
            await props.dispatch(addRoom(room));
            props.history.push('/dashboard');
          }}
        />
      </div>
    </div>
  );
};

export default connect()(AddRoom);
