import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getTimingsbyid } from '../../actions/timings';
import Header from '../Header';

import { Link } from 'react-router-dom';
import TimingItem from './TimingItem';
const RoomDayTimes = ({ getTimingsbyid, timings, match }) => {
  let { id, day } = match.params;
  useEffect(() => {
    getTimingsbyid(id);
  }, [getTimingsbyid, id]);

  const [dayTimings, setDayTimings] = useState([]);
  useEffect(() => {
    setDayTimings(timings && timings.filter(({ timing }) => timing.day == day));
  }, [timings, day]);

  return dayTimings.length === 0 ? (
    <div>
      <Header />
      <div style={{ marginTop: '5rem' }}>
        <div>
          <h3>No timings</h3>
          <Link to={`/add/room/${id}/${day}/timings`}>Create Timing</Link>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <Header />
      <div style={{ marginTop: '5rem' }}>
        <div>
          <Link to={`/add/room/${id}/${day}/timings`}>Create Timing</Link>
          {dayTimings &&
            dayTimings.map(({ timing }) => {
              return (
                <TimingItem
                  key={timing._id}
                  timing={timing}
                  room_id={id}
                  day={day}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state, props) => ({
  timings: state.timings,
});

export default connect(mapStateToProps, { getTimingsbyid })(RoomDayTimes);
