import React from "react";
import {Link} from "react-router-dom";
import { removeUser } from "../../actions/users";
import { connect } from "react-redux";

const TeachersListItem = (props)=>(
    <div>
            <h3>{props.teacher.user.name}</h3>
            <Link to={"/edit/teachers/"+props.teacher.user._id}>Edit</Link>
            <button onClick={()=>{props.dispatch(removeUser(props.teacher.user._id))}}>Remove</button>
    </div>
);



export default connect()(TeachersListItem);

/* <div>
        <Link to={"/vehicles/edit/"+props.vehicle.vehicle_id}>
            <h3>{props.vehicle.vehicle_name} - {props.vehicle.vehicle_type}- {props.vehicle.vehicle_number}</h3>
        </Link>
        <button onClick={async (e)=>{await props.dispatch(removeVehicles(props.vehicle.vehicle_id));}}>Remove</button>
        <Link to={"/vehicles/"+props.vehicle.vehicle_id+"/journeys"}>Manage Journey</Link>
         <Link to={"/vehicles/track/"+props.vehicle.vehicle_id}>Track Vehicle</Link>
    </div> */