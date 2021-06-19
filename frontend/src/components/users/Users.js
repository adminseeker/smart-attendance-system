import React, { useEffect } from "react";
import {connect} from "react-redux";
import LoadingPage from "../LoadingPage";
import {getUsers} from "../../actions/users"
import { Link } from "react-router-dom";
import useSWR from "swr";
import FacebookCircularProgress from "../FacebookCircularProgress";


const Users = ({getUsers})=>{
    useSWR("/users/students",()=>{
        getUsers()
    })
    return (
        <div>
            Users
            <Link to={"/users/students"}>Students</Link>
            <Link to={"/users/teachers"}>Teachers</Link>
            <Link to={"/users/admins"}>Admins</Link>
            <Link to={"/users/add"}>Add Users</Link>
        </div>
    )
      
}

const mapStateToProps = (state,props)=>({
    users:state.users
})

export default connect(mapStateToProps,{getUsers})(Users);
