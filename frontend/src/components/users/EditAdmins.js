import React from "react";
import {editUsers} from "../../actions/users";
import {connect} from "react-redux";
import UsersForm from "./UsersForm";


const EditAdmins = (props)=>{
    return(
        <div>
            <UsersForm user={props.admin} onSubmit={async (admin)=>{await props.dispatch(editUsers(admin,props.admin.user._id))
                props.history.push("/users")
            }}/>
        </div>
    )
}


const mapStateToProps = (state,props)=>{
    
    return{
        admin : state.users.admins.filter((admin)=>(String(admin.user._id)===String(props.match.params.id)))[0]
    }

};


export default connect(mapStateToProps)(EditAdmins);



