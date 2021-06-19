import React from "react";
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import {removeRoom} from "../actions/rooms"

const RoomsListItem = (props)=>(
    <div>
            <h3>{props.room.room_name}</h3>
            <Link to={"/edit/room/"+props.room._id}>Edit</Link>
            <button onClick={()=>{props.dispatch(removeRoom(props.room._id))}}>Remove</button>
    </div>
);



export default connect()(RoomsListItem);

/* <div>
        <Link to={"/vehicles/edit/"+props.vehicle.vehicle_id}>
            <h3>{props.vehicle.vehicle_name} - {props.vehicle.vehicle_type}- {props.vehicle.vehicle_number}</h3>
        </Link>
        <button onClick={async (e)=>{await props.dispatch(removeVehicles(props.vehicle.vehicle_id));}}>Remove</button>
        <Link to={"/vehicles/"+props.vehicle.vehicle_id+"/journeys"}>Manage Journey</Link>
         <Link to={"/vehicles/track/"+props.vehicle.vehicle_id}>Track Vehicle</Link>
    </div> */