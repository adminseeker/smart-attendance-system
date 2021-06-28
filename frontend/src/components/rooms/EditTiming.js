import React from 'react';
import TimingsForm from './TimingsForm';
import { editTiming } from '../../actions/timings';
import { connect } from 'react-redux';
import Header from '../Header';

const EditTiming = (props) => {
  let { roomId, day, id } = props.match.params;
  let { timing } = props.timing;
  // console.log(timing);
  return (
    <div>
      <Header />
      <div style={{ marginTop: '5rem' }}>
        <TimingsForm
          timing={{ ...timing, day: day }}
          onSubmit={async (timing) => {
            // console.log(timing);
            await props.dispatch(editTiming(timing, id, roomId));
            props.history.push(`/room/${roomId}/timings/${day}`);
          }}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  // console.log(state.timings);
  return {
    timing: state.timings.filter(
      (timing) => String(timing.timing._id) === String(props.match.params.id)
    )[0],
  };
};

export default connect(mapStateToProps)(EditTiming);
