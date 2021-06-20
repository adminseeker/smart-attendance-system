import React,{useEffect, useState} from "react";
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import FacebookCircularProgress from "../FacebookCircularProgress";
import StudentsListItem from "./StudentsListItem";
import {addStudents} from "../../actions/classes";

const StudentsList = ({students,class_id,addStudents})=>{
    const [usn,set_usn] = useState("")
    return (
        !students ? <FacebookCircularProgress /> :
          <div>
              Students
              Add Students
              <form>
                <input type="text" name="usn" id="usn" value={usn} onChange={(e)=>set_usn(e.target.value)}/>
                <button type="submit" onClick={(e)=>{e.preventDefault(); if(usn=="") alert("empty usn!"); else addStudents(class_id,usn) }}>Add Student</button>
              </form>
            {students.map((student) => (
            <StudentsListItem key={student.student._id} student={student} class_id={class_id}/>
            ))}
          </div>
        )
};

const mapStateToProps = (state,props)=>(
    {
        students: state.users.ClassStudents,
        
    }
)

export default connect(mapStateToProps,{addStudents})(StudentsList);

