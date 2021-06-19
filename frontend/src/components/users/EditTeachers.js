import React from "react";
import {editUsers} from "../../actions/users";
import {connect} from "react-redux";
import UsersForm from "./UsersForm";


const EditTeachers = (props)=>{
    return(
        <div>
            <UsersForm user={props.teacher} onSubmit={async (teacher)=>{await props.dispatch(editUsers(teacher,props.teacher.user._id))
                props.history.push("/users")
            }}/>
        </div>
    )
}


const mapStateToProps = (state,props)=>{
    
    return{
        teacher : state.users.teachers.filter((teacher)=>(String(teacher.user._id)===String(props.match.params.id)))[0]
    }

};


export default connect(mapStateToProps)(EditTeachers);



