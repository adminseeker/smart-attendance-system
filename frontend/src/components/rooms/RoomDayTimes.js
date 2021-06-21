import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getTimingsbyid } from '../../actions/timings';
import moment from 'moment';
import { Link } from 'react-router-dom';
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
      <h3>No timings</h3>
      <Link to={`/add/${id}/${day}/timings`}>Create room</Link>
    </div>
  ) : (
    <div>
      <Link to={`/add/${id}/${day}/timings`}>Create room</Link>
      {dayTimings &&
        dayTimings.map(({ timing }) => {
          let date = moment(timing.start_time);
          let start_time = date.utc().format('hh:mm A');
          date = moment(timing.end_time);
          let end_time = date.utc().format('hh:mm A');
          return (
            <div key={timing._id}>
              <h3>{`${timing.class.class_name} duration= ${start_time} to ${end_time}`}</h3>
            </div>
          );
        })}
    </div>
  );
};
const mapStateToProps = (state, props) => ({
  timings: state.timings,
});

export default connect(mapStateToProps, { getTimingsbyid })(RoomDayTimes);
