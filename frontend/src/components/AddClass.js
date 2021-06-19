import React from "react";
import ClassesForm from "./ClassesForm";
import {addClass} from "../actions/classes";
import {connect} from "react-redux";


const AddClass = (props)=>{
    return(
        <div>
            <ClassesForm onSubmit={async (_class)=>{await props.dispatch(addClass(_class))
                props.history.push("/classes")
            }}/>
        </div>
    )
}


export default connect()(AddClass);
