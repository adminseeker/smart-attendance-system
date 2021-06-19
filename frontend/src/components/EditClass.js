import React from "react";
import ClassesForm from "./ClassesForm";
import {addClass, editClasses} from "../actions/classes";
import {connect} from "react-redux";


const EditClass = (props)=>{
    return(
        <div>
            <ClassesForm _class={props._class} onSubmit={async (_class)=>{await props.dispatch(editClasses(_class,props._class._id))
                props.history.push("/classes")
            }}/>
        </div>
    )
}


const mapStateToProps = (state,props)=>{
    
    return{
        _class : state.classes.filter((_class)=>(String(_class._id)===String(props.match.params.id)))[0]
    }

};


export default connect(mapStateToProps)(EditClass);



