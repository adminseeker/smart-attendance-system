import React,{useEffect, useState} from "react";
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import FacebookCircularProgress from "../FacebookCircularProgress";
import LoadingPage from "../LoadingPage";
import useSWR from "swr";
import AdminsListItem from "./AdminsListItem";

const AdminsList = ({admins})=>{
 
    return (
        !admins ? <FacebookCircularProgress /> :
          <div>
              Admins
            {admins.map((admin) => (
            <AdminsListItem key={admin._id} admin={admin} />
            ))}
          </div>
        )
};

const mapStateToProps = (state,props)=>(
    {
        admins: state.users.admins,
    }
)

export default connect(mapStateToProps)(AdminsList);

