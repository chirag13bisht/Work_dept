import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';


const Login = () => {

    const navigate = useNavigate();
    const [username, setusername] = useState("");
    const [pass, setpass] = useState("");
    const [error, seterror] = useState(false);
   

    Axios.defaults.withCredentials = true;

    const submitLogin = async(e) => {
        e.preventDefault();
        if(username.length===0|| pass.length===0 ){
            seterror(true);
        }
        else {
           await Axios.post('http://localhost:3002/api/login', { username: username,  pass: pass, })
           .then(res=>{
            if(res.data.message){
                if(res.data.message==="Wrong username/password"){
                    alert("wrong password")
                }
                else{
                    alert("no user existed")
            }
        }
            else{
               
                window.alert("LogIn successfully")
                navigate('/profile')  
            }
         
           })
           .catch(error => console.log(error));  
        }
    }

  return (
    <>
      <div className='bg-gradient-to-r
                 from-[#012f66] to-[#0568a1]  py-3' >
        <img className="m-5 px-20" src='/Images/drdo_logo.png' alt='logo' />
      </div>
      <div className='relative'>
          <img src='/Images/banner.jpg' alt='background' />
      </div>

      <div className="w-full max-w-xs mx-auto mt-10">
            
            <form  className=" bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4">
                <div className="justify-between items-center mb-8 ">
                    <h className="text-center block text-3xl text-gray-800 font-medium">LOG IN</h>
                </div>
                 
                <div class="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Username
                    </label>
                    <input onChange={(e) => {
                            setusername(e.target.value)
                        }}
                    placeholder='Username'
                     class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" />
                {error &&username.length<=0?<label className='text-red-500 text-sm px-2 '>Username cannot be empty</label>:""}
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2" >
                        Password
                    </label>
                    <input onChange={(e) => {
                            setpass(e.target.value)
                        }}
                    placeholder='Password'
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" />
                {error &&pass.length<=0?<label className='text-red-500 text-sm px-2 '>Password cannot be empty</label>:""}
                </div>
                <div class="flex items-center justify-between">
                    <button onClick={submitLogin}
                    class="bg-[#055C9D] hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Log In
                    </button>
                    <a class="inline-block align-baseline  text-sm text-blue-500 hover:text-blue-800" href='/Signup' >
                        Don't have an account?
                    </a>
                </div>


            </form>
        </div>
    </>





  )
}

export default Login



