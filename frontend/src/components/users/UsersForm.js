import React, { useState } from "react";
import { connect } from "react-redux";
import {addUser,getUsers,editUsers,removeUser} from "../../actions/users"

// {	"name":"student10",
// 	"email":"student10@gmail.com",
// 	"password":"password",
// 	"phone":"1234567890",
// 	"role":"student",
// 	"usn":"1RV18CS010",
// 	"semester":"6"
// }



const UsersForm = (props)=>{
    const [formData,setFormData] = useState({
    "name":props.user ? props.user.user.name : "",
	"email":props.user ? props.user.user.email : "",
	"password":props.user ? props.user.user.password : "",
	"phone":props.user ? props.user.user.phone : "",
	"role":props.user ? props.user.user.role : "",
	"usn":props.user ? props.user.usn : "",
	"semester":props.user ? props.user.semester : "",
});

const {name,email,password,phone,role,usn,semester} = formData

const onChange = (e)=>{
    setFormData({...formData , [e.target.name]:e.target.value})
}

const onSubmit = async (e)=>{
    e.preventDefault();
    if(name=="" || email=="" || (!props.user && password=="") || phone=="" || role=="" || (role!=="admin" && usn=="") || (semester=="" && role=="student")){
        alert("Invalid field!!")
    }
    else{
        if(!props.user){
            props.onSubmit(formData);
        }else{
            const updatedItems = {};
            if(props.user.user.name!==name)
                updatedItems.name=name;
            if(props.user.user.email!==email)
                updatedItems.email=email;
            if(props.user.user.phone!==phone)
                updatedItems.phone=phone;
            if(props.user.user.role!==role)
                updatedItems.role=role;
            if(props.user.usn!==usn)
                updatedItems.usn=usn;
            if(props.user.semester!==semester)
                updatedItems.semester=semester
            props.onSubmit(updatedItems);
        }
    }
}
    return(
        <div>

            <form onSubmit={onSubmit}> 
            <label htmlFor="name">Name: </label>
              <input id="name" name="name" type="text" value={name} onChange={onChange} />
            <label htmlFor="email">email: </label>
              <input id="email" name="email" type="text" value={email} onChange={onChange} />
              {!props.user && <label htmlFor="password">password: </label>}
             {!props.user && <input id="password" name="password" type="password" value={password} onChange={onChange} />}
              <label htmlFor="phone">Phone: </label>
              <input id="phone" name="phone" type="text" value={phone} onChange={onChange} />
              <label htmlFor="role">Role: </label>
              <input id="role" name="role" type="text" value={role} onChange={onChange} />
             {role=="student" && <label htmlFor="semester">Semester:</label>}
              {role=="student" && <input id="semester" name="semester" type="text" value={semester} onChange={onChange} />}
              <label htmlFor="usn">{role == "student" && "USN: "} {role=="teacher" && "Teacher ID: "}</label>
              {role!=="admin" && role!=="" && <input id="usn" name="usn" type="text" value={usn} onChange={onChange} />}
              <input type="submit" value="Submit"/>
            </form>
            
        </div>
    );
        
}

export default connect()(UsersForm);

