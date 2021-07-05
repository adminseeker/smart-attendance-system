import React from 'react';
import TimingsForm from './TimingsForm';
import { addTiming } from '../../actions/timings';
import { connect } from 'react-redux';
import Header from '../Header';
import { setAlert } from '../../actions/alert';

const AddTiming = (props) => {
  let { roomId, day } = props.match.params;

  return (
    <div>
      <Header />
      <div style={{ marginTop: '5rem' }}>
        <TimingsForm
          timing={{ day: day }}
          onSubmit={async (timing) => {
            let res = await props.dispatch(addTiming(timing, roomId));
            res.msg
              ? props.dispatch(setAlert(res.msg, 'info'))
              : props.dispatch(
                  setAlert('Timing added successfully!!', 'success')
                );
            props.history.push(`/room/${roomId}/timings/${day}`);
          }}
        />
      </div>
    </div>
  );
};

export default connect()(AddTiming);
