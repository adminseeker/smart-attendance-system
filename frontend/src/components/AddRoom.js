import React from 'react';
import RoomsForm from './RoomsForm';
import { addRoom } from '../actions/rooms';
import { connect } from 'react-redux';
import Header from './Header';
import { setAlert } from '../actions/alert';

const AddRoom = (props) => {
  return (
    <div>
      <Header />
      <div style={{ marginTop: '5rem' }}>
        <RoomsForm
          onSubmit={async (room) => {
            let res = await props.dispatch(addRoom(room));
            if (res && res.room_name)
              props.dispatch(setAlert('Room Added successfully!!!', 'success'));
            else props.dispatch(setAlert('Room Addition failed!!!', 'error'));

            props.history.push('/dashboard');
          }}
        />
      </div>
    </div>
  );
};

export default connect()(AddRoom);
