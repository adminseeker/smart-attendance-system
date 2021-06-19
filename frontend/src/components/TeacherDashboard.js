import React, { useEffect } from "react";
import {connect} from "react-redux";
import LoadingPage from "./LoadingPage";
import { Link } from "react-router-dom";

import FacebookCircularProgress from "./FacebookCircularProgress";

const TeacherDashboard = ({user,loading})=>{
       
    return (
        loading ? <FacebookCircularProgress />       
    :(
        <div>
            Teacher Dashboard

        </div>
    )
      )
}

const mapStateToProps = (state)=>({
    user:state.auth.user,
    loading:state.auth.loading
    
})

export default connect(mapStateToProps)(TeacherDashboard);
