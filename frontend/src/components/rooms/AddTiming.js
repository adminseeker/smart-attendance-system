import React from 'react';
import TimingsForm from './TimingsForm';
import { addTiming } from '../../actions/timings';
import { connect } from 'react-redux';
import Header from '../Header';

const AddTiming = (props) => {
  let { roomId, day } = props.match.params;

  return (
    <div>
      <Header />
      <div style={{ marginTop: '5rem' }}>
        <TimingsForm
          timing={{ day: day }}
          onSubmit={async (timing) => {
            await props.dispatch(addTiming(timing, roomId));
            props.history.push(`/room/${roomId}/timings/${day}`);
          }}
        />
      </div>
    </div>
  );
};

export default connect()(AddTiming);
