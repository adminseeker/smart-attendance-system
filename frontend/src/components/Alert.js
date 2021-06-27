import React from 'react';
import { connect } from 'react-redux';
import AlertItem from './AlertItem';

const Alert = (props) => {
  return (
    <div>
      {props.alerts !== null &&
        props.alerts.length > 0 &&
        props.alerts.map((alert) => (
          <AlertItem type={alert.alertType} msg={alert.msg} key={alert.id} />
        ))}
    </div>
  );
};
const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
