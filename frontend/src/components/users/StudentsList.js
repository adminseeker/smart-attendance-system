import React,{useEffect, useState} from "react";
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import FacebookCircularProgress from "../FacebookCircularProgress";
import LoadingPage from "../LoadingPage";
import useSWR from "swr";
import StudentsListItem from "./StudentsListItem";

const StudentsList = ({students})=>{
 
    return (
        !students ? <FacebookCircularProgress /> :
          <div>
              Students
            {students.map((student) => (
            <StudentsListItem key={student._id} student={student} />
            ))}
          </div>
        )
};

const mapStateToProps = (state,props)=>(
    {
        students: state.users.students,
    }
)

export default connect(mapStateToProps)(StudentsList);

