import axios from "axios";
import { CREATE_TODO, LOGIN, REGISTER, TODO_LIST } from "./apiConstants";


export const login = async (data)=>{
    return axios.post(LOGIN,data)  
}

export const register = async (data)=>{
    return axios.post(REGISTER,data)  
}

export const createTodoApi = async (data)=>{
    let token=getToken();
    console.log(token,'token');
    return axios.post(CREATE_TODO,data,{
        headers: {
            auth: token
        }
    })  
}

export const getTodoListApi = async (data)=>{
    let token=getToken();
    console.log(token,'token');
    return axios.get(TODO_LIST,{
        headers: {
            auth: token
        }
    })  
}


export  function getToken(){
   let user= localStorage.getItem('user');
   if(!user) return
   const userObj=JSON.parse(user);
   return userObj.token;
}
