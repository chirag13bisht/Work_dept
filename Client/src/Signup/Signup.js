import React from 'react'
import Axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

    const navigate = useNavigate();
    const [username, setusername] = useState("");
    const [name, setname] = useState("");
    const [pass, setpass] = useState("");
    const [department, setdepartment] = useState("");
    const [confirmpass, setconfirmpass] = useState("");
    const [error, seterror] = useState(false);

    Axios.defaults.withCredentials = true;

    const submitSignup = async (e) => {
        e.preventDefault();
        if (
          name.length === 0 ||
          username.length === 0 ||
          pass.length === 0 ||
          department.length === 0 ||
          confirmpass.length === 0
        ) {
          seterror(true);
        } else if (confirmpass !== pass) {
          window.alert('Confirm password does not match');
        } else {
          try {
            const response = await Axios.post('http://localhost:3002/api/signup', {
              username: username,
              name: name,
              pass: pass,
              department: department,
            });
    
            if (response.data === 'Error') {
              window.alert('Username already exists');
            } else {
              navigate('/');
            }
          } catch (error) {
            console.log('Error during signup:', error);
            alert('Error during signup. Please try again later.');
          }
        }
      };
    
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

                <form className=" bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4">
                    <div className="justify-between items-center mb-8 ">
                        <h className="text-center block text-3xl text-gray-800 font-medium">SIGN UP</h>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Name
                        </label>
                        <input onChange={(e) => {
                            setname(e.target.value)
                        }}
                            placeholder='Name'
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" />
                    {error &&name.length<=0?<label className='text-red-500 text-sm px-2 '>Name cannot be empty</label>:""}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Department
                        </label>
                        <input onChange={(e) => {
                            setdepartment(e.target.value)
                        }}
                            placeholder='Department'
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" />
                    {error &&department.length<=0?<label className='text-red-500 text-sm px-2 '>Department cannot be empty</label>:""}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Username
                        </label>
                        <input onChange={(e) => {
                            setusername(e.target.value)
                        }}
                            placeholder='Username'
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" />
                    {error &&username.length<=0?<label className='text-red-500 text-sm px-2 '>Username cannot be empty</label>:""}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" >
                            Password
                        </label>
                        <input onChange={(e) => {
                            setpass(e.target.value)
                        }}
                            placeholder='Password'
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" />
                    {error &&pass.length<=0?<label className='text-red-500 text-sm px-2 '>Password cannot be empty</label>:""}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Confirm Password
                        </label>
                        <input onChange={(e) => {
                            setconfirmpass(e.target.value)
                        }}
                            placeholder='Confirm Password'
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" />
                    {error &&confirmpass.length<=0?<label className='text-red-500 text-sm px-2 '>Confirm Password cannot be empty</label>:""}
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                        <button onClick={submitSignup}
                            className="w-full bg-blue-500  border-2 rounded-md shadow-2xl text-white  transition ease-in-out delay-150  hover:scale-110 hover:bg-green-500 duration-300 ...  font-bold py-2 px-4  focus:outline-none focus:shadow-outline" type="button">
                            Signup
                        </button>
                    </div>


                </form>
            </div>
        </>
    )
}

export default Signup