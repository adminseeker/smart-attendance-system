import React from 'react';
import TimingsForm from './TimingsForm';
import {addTiming} from "../../actions/timings";
import { connect } from 'react-redux';

const AddTiming = (props) => {
  let {roomId,day} = props.match.params;
  
  return (
    <div>
      <TimingsForm
         timing = {{day:day}}
         
        onSubmit={async (timing) => {
          await props.dispatch(addTiming(timing,roomId));
            props.history.push(`/room/${roomId}/timings/${day}`);
        }}
      />
    </div>
  );
};

export default connect()(AddTiming);
