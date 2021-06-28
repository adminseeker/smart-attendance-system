import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { removeTiming } from '../../actions/timings';
import { connect } from 'react-redux';
const TimingItem = (props) => {
  let { timing, room_id, day } = props;
  let date = moment(timing.start_time);
  let start_time = date.utc().format('hh:mm A');
  date = moment(timing.end_time);
  let end_time = date.utc().format('hh:mm A');
  return (
    <div>
      <h3>
        {timing.class &&
          `${timing.class.class_name} duration= ${start_time} to ${end_time}`}
      </h3>
      <Link to={`/edit/room/${room_id}/${day}/timings/${timing._id}`}>
        Edit
      </Link>
      <button
        onClick={() => {
          props.dispatch(removeTiming(timing._id, room_id));
        }}
      >
        Remove
      </button>
    </div>
  );
};

export default connect()(TimingItem);
