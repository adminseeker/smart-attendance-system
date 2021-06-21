import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const RoomTimings = (props) => {
  const days = [
    'SunDay',
    'MonDay',
    'TuesDay',
    'WednesDay',
    'ThursDay',
    'FriDay',
    'SaturDay',
  ];
  return (
    <div>
      {days.map((day, i) => {
        return (
          <Link key={i} to={`/room/${props.match.params.id}/timings/${i}`}>
            <h3>{day}</h3>
          </Link>
        );
      })}
    </div>
  );
};
const mapStateToProps = (state, props) => ({});

export default connect(mapStateToProps, {})(RoomTimings);
