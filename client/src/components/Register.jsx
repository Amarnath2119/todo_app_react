import React, { useEffect, useState } from 'react'
import { register } from '../services/api'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Header from './partials/Header';
function Register() {
  const [form, setForm] = useState({
    name:"",
    username:"",
    email:"",
    password:""
  });
  const[errors, setErrors]= useState(null);
  const navigation = useNavigate();

  useEffect(()=>{
    const user = localStorage.getItem('user');
    if(user){
        return navigation('/')
    }
  })
  
  const handleInputChange = (e) =>{
    setForm({...form,[e.target.name]:e.target.value})
  }
  
  const handleSubmit =async () => {
    const result = await register(form);
    if(result.status===200){
        if(result.data.status===201){
          setErrors(result.data.data);
          toast(result.data.message)
          return;
        }

        if(result.data.status===200){
           localStorage.setItem('user',JSON.stringify(result.data.data));
           navigation('/')
           return;
          }

          
        if(result.data.status===200){
           toast(result.data.message)
            return;
           }

    }else{
        toast('Something went wrong, Please try again');
    }
  }

  return (
    <>
    <Header/>
    <div className='container'>
        <ToastContainer />
        <div className="row justify-content-center mt-4">
            <div className="col-lg-5 card border-primary mt-4">
             <div className="card-body">
               <h4 className="card-title">Register</h4>
               <div className="form-group">
                <label htmlFor="exampleInputName" className="form-label mt-4">Name</label>
                <input 
                name='name' 
                type="text" 
                className="form-control" 
                id="exampleInputEmail1"  
                placeholder="Enter your name" 
                wfd-id="id10" 
                onChange={handleInputChange}/>
                {errors?.name &&(
                 <small id="emailHelp" className="form-text text-danger">
                   {errors.name.msg}
                 </small>
                  )}
               
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputUserName" className="form-label mt-4">Username</label>
                <input 
                name='username'
                type="text" 
                className="form-control"
                id="exampleInputEmail1"  
                placeholder="Enter your username" 
                wfd-id="id10" 
                onChange={handleInputChange}/>
                 {errors?.username &&(
                 <small id="emailHelp" className="form-text text-danger">
                   {errors.username.msg}
                 </small>
                  )}
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputEmail" className="form-label mt-4"> Email</label>
                <input 
                name='email'
                type="email" 
                className="form-control" 
                id="exampleInputEmail1" 
                aria-describedby="emailHelp" 
                placeholder="Enter your email " 
                wfd-id="id10" 
                onChange={handleInputChange}/>
                 {errors?.email &&(
                 <small id="emailHelp" className="form-text text-danger">
                   {errors.email.msg}
                 </small>
                  )}
                
            </div>
            
            
            <div className="form-group">
             <label htmlFor="exampleInputPassword1" className="form-label mt-4">Password</label>
             <input type="password"
             name='password' 
             className="form-control" 
             id="exampleInputPassword1" 
             placeholder="Password" 
             wfd-id="id11"
             onChange={handleInputChange}/>
              {errors?.password &&(
                 <small id="emailHelp" className="form-text text-danger">
                   {errors.password.msg}
                 </small>
                  )}
            </div>
            <button 
            type="button" 
            className="btn btn-secondary"
            onClick={handleSubmit}
            >Register</button>
            </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Register