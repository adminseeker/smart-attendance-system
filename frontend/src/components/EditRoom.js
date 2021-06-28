import React from 'react';
import RoomsForm from './RoomsForm';
import { editRoom } from '../actions/rooms';
import { connect } from 'react-redux';
import Header from './Header';
import { setAlert } from '../actions/alert';

const EditRoom = (props) => {
  return (
    <div>
      <Header />
      <div style={{ marginTop: '5rem' }}>
        <RoomsForm
          room={props.room}
          onSubmit={async (room) => {
            let res = await props.dispatch(editRoom(room, props.room._id));
            if (res && res.room_name)
              props.dispatch(
                setAlert('Room Upated successfully!!!', 'success')
              );
            else props.dispatch(setAlert('Room update failed!!!', 'error'));
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
