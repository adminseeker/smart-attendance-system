import React from 'react';
import ClassesForm from './ClassesForm';
import { addClass } from '../actions/classes';
import { connect } from 'react-redux';
import Header from './Header';

const AddClass = (props) => {
  return (
    <div>
      <Header />
      <div style={{ marginTop: '5rem' }}>
        <ClassesForm
          onSubmit={async (_class) => {
            await props.dispatch(addClass(_class));
            props.history.push('/classes');
          }}
        />
      </div>
    </div>
  );
};

export default connect()(AddClass);
