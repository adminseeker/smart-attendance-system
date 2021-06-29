import React from 'react';
import ClassesForm from './ClassesForm';
import { editClasses } from '../actions/classes';
import { connect } from 'react-redux';
import Header from './Header';
import { setAlert } from '../actions/alert';

const EditClass = (props) => {
  return (
    <div>
      <Header />
      <div style={{ marginTop: '5rem' }}>
        <ClassesForm
          _class={props._class}
          onSubmit={async (_class) => {
            let res = await props.dispatch(
              editClasses(_class, props._class._id)
            );
            if (res && res.class_name)
              props.dispatch(
                setAlert('Class Upated successfully!!!', 'success')
              );
            else props.dispatch(setAlert('Class update failed!!!', 'error'));
            props.history.push('/classes');
          }}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    _class: state.classes.filter(
      (_class) => String(_class._id) === String(props.match.params.id)
    )[0],
  };
};

export default connect(mapStateToProps)(EditClass);
