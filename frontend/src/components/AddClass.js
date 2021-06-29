import React from 'react';
import ClassesForm from './ClassesForm';
import { addClass } from '../actions/classes';
import { connect } from 'react-redux';
import Header from './Header';
import { setAlert } from '../actions/alert';
const AddClass = (props) => {
  return (
    <div>
      <Header />
      <div style={{ marginTop: '5rem' }}>
        <ClassesForm
          onSubmit={async (_class) => {
            let res = await props.dispatch(addClass(_class));
            if (res && res.class_name)
              props.dispatch(
                setAlert('Class Added successfully!!!', 'success')
              );
            else props.dispatch(setAlert('Class Addition failed!!!', 'error'));
            props.history.push('/classes');
          }}
        />
      </div>
    </div>
  );
};

export default connect()(AddClass);
