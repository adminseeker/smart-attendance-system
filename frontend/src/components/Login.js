import React, { useState } from "react";
import {login} from "../actions/auth";
import {connect} from "react-redux";
import { Redirect } from "react-router-dom";
import Dashboard from "../components/Dashboard"
import FacebookCircularProgress from "./FacebookCircularProgress";



const Login = (props)=> {

  const [formData,setFormData] = useState({
    email:"",
    password:"",
    error:false
});


const {email,password,error} = formData;

const onChange = (e)=>{
    setFormData({...formData , [e.target.name]:e.target.value})
}

const onSubmit = async (e)=>{
    e.preventDefault();
    const res = await props.dispatch(login({email,password}))
    if(res==="error"){
        setFormData({...formData,error:true});
    }
}
if(props.isAuthenticated){
    return <Redirect to="/dashboard" />
}

  return (
      props.loading ? <FacebookCircularProgress /> :
        <div>
            <form onSubmit={onSubmit}>
              <label htmlFor="email">email</label>
              <input id="email" name="email" type="text" value={email} onChange={onChange} />
              <label htmlFor="password">password</label>
              <input id="password" name="password" type="password" value={password} onChange={onChange} />
              <input type="submit" value="Log In"/>
            </form>
         
        </div>
  );
}

const mapStateToProps = (state,props)=>({
    isAuthenticated:state.auth.isAuthenticated,
    loading:state.auth.loading
})

export default connect(mapStateToProps)(Login);