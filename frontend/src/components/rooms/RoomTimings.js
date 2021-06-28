import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../Header';

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
      <Header />
      <div style={{ marginTop: '5rem' }}>
        {days.map((day, i) => {
          return (
            <Link key={i} to={`/room/${props.match.params.id}/timings/${i}`}>
              <h3>{day}</h3>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
const mapStateToProps = (state, props) => ({});

export default connect(mapStateToProps, {})(RoomTimings);
