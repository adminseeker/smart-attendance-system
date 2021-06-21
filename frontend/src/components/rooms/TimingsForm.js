import React, { useState } from 'react';

const TimingsForm = (props) => {
  const [timing, setTiming] = useState({
    _class: props.timing._class ? props.timing._class : '',
    day: props.timing._class ? props.timing._class : '',
    start_time: props.timing.start_time ? props.timing.start_time : '',
    end_time: props.timing.end_time ? props.timing.end_time : '',
  });
  return <div></div>;
};

export default TimingsForm;
