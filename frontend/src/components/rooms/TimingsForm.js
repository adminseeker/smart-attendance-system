/* eslint-disable eqeqeq */
import React, { useState } from 'react';
import { connect } from 'react-redux';

const TimingsForm = (props) => {
  const [formData, setFormData] = useState({
    _class: props.timing.class ? props.timing.class._id : '',
    day: props.timing.day ? props.timing.day : '',
    start_time: props.timing.start_time ? props.timing.start_time : '',
    end_time: props.timing.end_time ? props.timing.end_time : '',
  });
  const { _class, day, start_time, end_time } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (_class == '' || day == '' || start_time == '' || end_time == '') {
      alert('Invalid field!!');
    } else {
      if (!props.timing) {
        const updatedItems = {};
        updatedItems.class = _class;
        updatedItems.day = day;
        updatedItems.start_time = start_time;
        updatedItems.end_time = end_time;
        props.onSubmit(updatedItems);
      } else {
        const updatedItems = {};

        updatedItems.class = _class;
        updatedItems.day = day;

        updatedItems.start_time = start_time;

        updatedItems.end_time = end_time;

        props.onSubmit(updatedItems);
      }
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor='_class'>Class: </label>
        <input
          id='_class'
          name='_class'
          type='text'
          value={_class}
          onChange={onChange}
        />
        <label htmlFor='start_time'>Start Time: </label>
        <input
          id='start_time'
          name='start_time'
          type='text'
          value={start_time}
          onChange={onChange}
        />

        <label htmlFor='end_time'>End Time: </label>
        <input
          id='end_time'
          name='end_time'
          type='text'
          value={end_time}
          onChange={onChange}
        />
        <input type='submit' value='Submit' />
      </form>
    </div>
  );
};

export default connect()(TimingsForm);
