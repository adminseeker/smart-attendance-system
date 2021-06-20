import React,{useEffect, useState} from "react";
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import { getTeacher,removeTeacher,addTeacher } from "../../actions/classes";
import FacebookCircularProgress from "../FacebookCircularProgress";

const TeacherList = ({teacher,class_id,removeTeacher,addTeacher})=>{
  const [clicked,setClicked] = useState(false)  
  const [teacherUSN,setTeacherUSN] = useState(teacher ? teacher.usn : "")  
  // useEffect(()=>{
    //   getTeacher(class_id)

    // },[getTeacher,class_id])
    return (
          !teacher ? <div>
            
            <h2>No Teacher Found</h2>
            <form>
                  <input type="text" name="teacher" value={teacherUSN} onChange={(e)=>setTeacherUSN(e.target.value)}></input>
                  <button onClick={(e)=>{ e.preventDefault(); addTeacher(class_id,teacherUSN);}}>Submit</button>
                </form>
          </div> :
          <div>
              Teacher
              <h3>{teacher.user.name}</h3>
              <button onClick={(e)=>{setClicked(true)}}>Change Teacher</button>
              { (clicked || !teacher ) &&  <form>
                  <input type="text" name="teacher" value={teacherUSN} onChange={(e)=>setTeacherUSN(e.target.value)}></input>
                  <button onClick={(e)=>{ e.preventDefault(); addTeacher(class_id,teacherUSN); setClicked(false)}}>Submit</button>
                </form>}
          </div>
        )
};

const mapStateToProps = (state,props)=>(
    {
        teacher: state.users.ClassTeacher,
        
    }
)

export default connect(mapStateToProps,{removeTeacher,addTeacher})(TeacherList);

