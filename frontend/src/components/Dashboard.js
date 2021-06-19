import React from "react";
import {connect} from "react-redux";
import LoadingPage from "./LoadingPage";
import {logout} from "../actions/auth";
import AdminDashboard from "./AdminDashboard";
import StudentDashboard from "./StudentDashboard";
import TeacherDashboard from "./TeacherDashboard";
import FacebookCircularProgress from "./FacebookCircularProgress";

const Dashboard = ({user,loading,logout})=>{
    return (
        user==null ? <FacebookCircularProgress />        
    :(
        <div>
            {user.user.role==="admin" &&  <AdminDashboard />}
            {user.user.role==="student" && <StudentDashboard />}
            {user.user.role==="teacher" && <TeacherDashboard />}
            <button onClick={()=>{logout()}}>Logout</button>
        </div>
    )
      )
}

const mapStateToProps = (state)=>({
    user:state.auth.user,
    loading:state.auth.loading
})

export default connect(mapStateToProps,{logout})(Dashboard);