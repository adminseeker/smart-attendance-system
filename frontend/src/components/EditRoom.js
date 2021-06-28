import React from 'react';
import RoomsForm from './RoomsForm';
import { addRoom, editRoom } from '../actions/rooms';
import { connect } from 'react-redux';
import Header from './Header';

const EditRoom = (props) => {
  console.log(props.room);
  return (
    <div>
      <Header />
      <div style={{ marginTop: '5rem' }}>
        <RoomsForm
          room={props.room}
          onSubmit={async (room) => {
            await props.dispatch(editRoom(room, props.room._id));
            props.history.push('/dashboard');
          }}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    room: state.rooms.filter(
      (room) => String(room._id) === String(props.match.params.id)
    )[0],
  };
};

export default connect(mapStateToProps)(EditRoom);
