import React from 'react';
import TimingsForm from './TimingsForm';
import { editTiming } from '../../actions/timings';
import { connect } from 'react-redux';
import Header from '../Header';
import { setAlert } from '../../actions/alert';

const EditTiming = (props) => {
  let { roomId, day, id } = props.match.params;
  let timing  = props.timing ? props.timing.timing : "";

  return (
    <div>
      <Header />
      <div style={{ marginTop: '5rem' }}>
       {props.timing && <TimingsForm
          timing={{ ...timing, day: day }}
          onSubmit={async (timing) => {
            let res = await props.dispatch(editTiming(timing, id, roomId));
            res.msg
              ? props.dispatch(setAlert(res.msg, 'info'))
              : props.dispatch(
                  setAlert('Timing updated successfully!!', 'success')
                );
            props.history.push(`/room/${roomId}/timings/${day}`);
          }}
        />}
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    timing: state.timings.filter(
      (timing) => String(timing.timing._id) === String(props.match.params.id)
    )[0],
  };
};

export default connect(mapStateToProps)(EditTiming);
