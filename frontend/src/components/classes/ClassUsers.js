import React, { useEffect } from "react";
import {connect} from "react-redux";
import LoadingPage from "../LoadingPage";
import {getUsers} from "../../actions/users"
import { Link } from "react-router-dom";
import useSWR from "swr";
import StudentsList from "./StudentsList";
import {cleanUserState} from "../../actions/users"
import TeacherList from "./TeacherList";
import { getClassUsers } from "../../actions/classes";
import FacebookCircularProgress from "../FacebookCircularProgress";

const ClassUsers = ({id,getClassUsers,cleanUserState})=>{
    useEffect(()=>{
        cleanUserState() 
        getClassUsers(id)
    },[getClassUsers,cleanUserState,id])
    return (
    
        <div>
            Users
            <StudentsList class_id={id}/>
            <TeacherList class_id={id}/>
        </div>
    )
      
}

const mapStateToProps = (state,props)=>({
    id:props.match.params.id,

})

export default connect(mapStateToProps,{getClassUsers,cleanUserState})(ClassUsers);
