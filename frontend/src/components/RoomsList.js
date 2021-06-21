import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRooms } from '../actions/rooms';
import FacebookCircularProgress from './FacebookCircularProgress';
import useSWR from 'swr';
import RoomsListItem from './RoomsListItem';

const RoomsList = ({ rooms, getRooms }) => {
  useSWR('/dashboard', () => {
    getRooms();
  });
  return Object.keys(rooms).length == 0 ? (
    <div>
      No Rooms
      <Link to={'/add/room'}>Create room</Link>
    </div>
  ) : (
    <div>
      Rooms
      <Link to={'/add/room'}>Create room</Link>
      {rooms &&
        rooms.map((room) => <RoomsListItem key={room._id} room={room} />)}
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  rooms: state.rooms,
});

export default connect(mapStateToProps, { getRooms })(RoomsList);
