import React from "react";
import {editUsers} from "../../actions/users";
import {connect} from "react-redux";
import UsersForm from "./UsersForm";


const EditStudents = (props)=>{
    return(
        <div>
            <UsersForm user={props.student} onSubmit={async (student)=>{await props.dispatch(editUsers(student,props.student.user._id))
                props.history.push("/users")
            }}/>
        </div>
    )
}


const mapStateToProps = (state,props)=>{
    return{
        student : state.users.students.filter((student)=>(String(student.user._id)===String(props.match.params.id)))[0]
    }

};


export default connect(mapStateToProps)(EditStudents);



