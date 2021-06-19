import React, { useEffect } from "react";
import {connect} from "react-redux";
import LoadingPage from "./LoadingPage";
import { Link } from "react-router-dom";

import FacebookCircularProgress from "./FacebookCircularProgress";
import RoomsList from "./RoomsList";

const AdminDashboard = ({user,loading})=>{
       
    return (
        loading ? <FacebookCircularProgress />       
    :(
        <div>
            Admin Dashboard
            <Link to={"/classes"}>Classes</Link>
            <Link to={"/users"}>Users</Link>
            <RoomsList />

        </div>
    )
      )
}

const mapStateToProps = (state)=>({
    user:state.auth.user,
    loading:state.auth.loading
    
})

export default connect(mapStateToProps)(AdminDashboard);
