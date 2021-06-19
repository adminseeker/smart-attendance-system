import React from "react";
import {Link} from "react-router-dom";
import { removeClass } from "../actions/classes";
import { connect } from "react-redux";

const ClassesListItem = (props)=>(
    <div>
            <h3>{props._class.class_name}</h3>
            <Link to={"/edit/class/"+props._class._id}>Edit</Link>
            <button onClick={()=>{props.dispatch(removeClass(props._class._id))}}>Remove</button>
       
    </div>
);



export default connect()(ClassesListItem);

/* <div>
        <Link to={"/vehicles/edit/"+props.vehicle.vehicle_id}>
            <h3>{props.vehicle.vehicle_name} - {props.vehicle.vehicle_type}- {props.vehicle.vehicle_number}</h3>
        </Link>
        <button onClick={async (e)=>{await props.dispatch(removeVehicles(props.vehicle.vehicle_id));}}>Remove</button>
        <Link to={"/vehicles/"+props.vehicle.vehicle_id+"/journeys"}>Manage Journey</Link>
         <Link to={"/vehicles/track/"+props.vehicle.vehicle_id}>Track Vehicle</Link>
    </div> */