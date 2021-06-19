import axios from "axios";
import {v4 as uuid} from "uuid"

const addClass = (_class)=>{
    return async (dispatch)=>{
        try {
            const body = JSON.stringify({class_name:_class.class_name});
            const config = {
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const res = await axios.post("/api/classes/",body,config);
            await dispatch(getClasses());
            return res.data;
        } catch (error) {
            console.log(error);
            dispatch({
                type:"CLASSES_ERROR"
            })
        }
    }

}

const getClasses = ()=>{
    console.log("hi classes")
    return async (dispatch)=>{
        try {
            const res = await axios.get("/api/classes");
            console.log(res.data)
            dispatch({
                type:"GET_CLASSES",
                classes:res.data
            })
            
        } catch (error) {
            console.log(error);
            dispatch({
                type:"CLASSES_ERROR"
            })
        }        
    }
}

const editClasses = (_class,id)=>{
    return async (dispatch)=>{
        try {
                const body = JSON.stringify({class_name:_class.class_name});
            const config = {
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const res = await axios.patch("/api/classes/"+id+"/name",body,config);
            console.log(res.data);
            
            await dispatch(getClasses());
            return res.data;
        } catch (error) {
            console.log(error);
            dispatch({
                type:"CLASSES_ERROR"
            })
        }
    }
}

const removeClass = (id)=>{
    return async (dispatch)=>{
        try {
            const config = {
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const res = await axios.delete("/api/classes/"+id,config);
            console.log(res.data);
            await dispatch(getClasses());
            return res.data.msg;

        } catch (error) {
            console.log(error);
            dispatch({
                type:"CLASSES_ERROR"
            })
        }
    }
}


export {getClasses,editClasses,removeClass,addClass};