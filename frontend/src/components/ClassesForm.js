import React, { useState } from "react";
import { connect } from "react-redux";


const ClassesForm = (props)=>{
    const [class_name,set_class_name] = useState(props._class ? props._class.class_name: "");
    return(
        <div>

            <form onSubmit={(e)=>{e.preventDefault(); if(class_name==""){alert("Empty Class Name!")} else props.onSubmit({class_name})}}> 
              <label htmlFor="class_name">Class Name: </label>
              <input id="class_name" type="text" value={class_name} onChange={(e)=>{set_class_name(e.target.value)}} />
              <input type="submit" value="submit" />
            </form>
            
        </div>
    );
        
}

export default connect()(ClassesForm);

