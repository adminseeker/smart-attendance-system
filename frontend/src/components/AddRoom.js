import React from "react";
import RoomsForm from "./RoomsForm";
import {addRoom} from "../actions/rooms";
import {connect} from "react-redux";


const AddRoom = (props)=>{
    return(
        <div>
            <RoomsForm onSubmit={async (room)=>{await props.dispatch(addRoom(room))
                props.history.push("/dashboard")
            }}/>
        </div>
    )
}


export default connect()(AddRoom);
