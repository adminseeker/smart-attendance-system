import React from "react";
import UsersForm from "./UsersForm";
import {addUser} from "../../actions/users";
import {connect} from "react-redux";


const AddUsers = (props)=>{
    return(
        <div>
            <UsersForm onSubmit={async (user)=>{await props.dispatch(addUser(user))
                props.history.push("/users")
            }}/>
        </div>
    )
}


export default connect()(AddUsers);
