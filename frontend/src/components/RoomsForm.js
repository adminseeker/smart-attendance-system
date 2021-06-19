import React, { useState } from "react";
import { connect } from "react-redux";


const RoomsForm = (props)=>{
    const [room_name,set_room_name] = useState(props.room ? props.room.room_name: "");
    return(
        <div>

            <form onSubmit={(e)=>{e.preventDefault(); if(room_name==""){alert("Empty Room Name!")} else props.onSubmit({room_name})}}> 
              <label htmlFor="room_name">Room Name: </label>
              <input id="room_name" type="text" value={room_name} onChange={(e)=>{set_room_name(e.target.value)}} />
              <input type="submit" value="submit" />
            </form>
            
        </div>
    );
        
}

export default connect()(RoomsForm);

