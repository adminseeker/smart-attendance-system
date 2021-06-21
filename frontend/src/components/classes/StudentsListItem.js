import React from 'react';
import { Link } from 'react-router-dom';
import { removeStudent } from '../../actions/classes';
import { connect } from 'react-redux';

const StudentsListItem = (props) => {
  console.log(props.student);
  return (
    <div>
      <h3>{props.student.student.user.name}</h3>
      <button
        onClick={() => {
          props.removeStudent(props.class_id, props.student.student._id);
        }}
      >
        Remove
      </button>
    </div>
  );
};
const mapStateToProps = (state, props) => ({});

export default connect(mapStateToProps, { removeStudent })(StudentsListItem);

/* <div>
        <Link to={"/vehicles/edit/"+props.vehicle.vehicle_id}>
            <h3>{props.vehicle.vehicle_name} - {props.vehicle.vehicle_type}- {props.vehicle.vehicle_number}</h3>
        </Link>
        <button onClick={async (e)=>{await props.dispatch(removeVehicles(props.vehicle.vehicle_id));}}>Remove</button>
        <Link to={"/vehicles/"+props.vehicle.vehicle_id+"/journeys"}>Manage Journey</Link>
         <Link to={"/vehicles/track/"+props.vehicle.vehicle_id}>Track Vehicle</Link>
    </div> */
