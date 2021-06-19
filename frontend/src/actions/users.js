import axios from "axios";
import {v4 as uuid} from "uuid"

const addUser = (user)=>{
    return async (dispatch)=>{
        try {
            const body = JSON.stringify(user);
            const config = {
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const res = await axios.post("/api/users/add",body,config);
            await dispatch(getUsers());
            return res.data;
        } catch (error) {
            console.log(error);
            dispatch({
                type:"USERS_ERROR"
            })
        }
    }

}

const getUsers = ()=>{
    console.log("hi users")
    return async (dispatch)=>{
        try {
            const students = await axios.get("/api/users/students");
            const teachers = await axios.get("/api/users/teachers");
            const admins = await axios.get("/api/users/admins");
            const users = {students:students.data,teachers:teachers.data,admins:admins.data}
            dispatch({
                type:"GET_USERS",
                users
            })
            
        } catch (error) {
            console.log(error);
            dispatch({
                type:"USERS_ERROR"
            })
        }        
    }
}



const editUsers = (user,id)=>{
    return async (dispatch)=>{
        try {
            const body = JSON.stringify(user);
            const config = {
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const res = await axios.patch("/api/users/update/"+id,body,config);
            console.log(res.data);
            await dispatch(getUsers());
            return res.data;
        } catch (error) {
            console.log(error);
            dispatch({
                type:"USERS_ERROR"
            })
        }
    }
}

const removeUser = (id)=>{
    return async (dispatch)=>{
        try {
            const config = {
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const res = await axios.delete("/api/users/"+id,config);
            console.log(res.data);
            await dispatch(getUsers());
            return res.data;

        } catch (error) {
            console.log(error);
            dispatch({
                type:"USERS_ERROR"
            })
        }
    }
}


export {getUsers,addUser,editUsers,removeUser};