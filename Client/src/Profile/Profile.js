import React from 'react'
import Nav from '../Components/Nav'
import Axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Profile = () => {
    const Navigate = useNavigate()
    Axios.defaults.withCredentials = true;
    const [data, setdata] = useState("")
    const [No, setNo] = useState("")
    useEffect(() => {
        const userdata = async() =>{
            await Axios.get('http://localhost:3002')
            .then((res) => {
                setdata(res.data[0])
            })
        }
       userdata();
    }, []);

    useEffect(() => {
        const complaintdata = async() =>{
          await  Axios.get('http://localhost:3002/complaint_data')
            .then((res) => {
                setNo(res.data.length)
            })
        }
        complaintdata();
    }, []);

    const handleLogout = async(e) => {
        e.preventDefault();
        await Axios.get('http://localhost:3002/logout')
            .then(res => {
                if (res.status === 200) {
                    window.alert("logout");
                    Navigate('/')
                }
            }).catch(err => console.log(err))
    }

    return (
        <div className=' '>
            <Nav />
            <div className='mt-10'>
                <div className=' mx-auto max-w-md sm:max-w-lg'>
                    <div class="bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4 ">

                        <div className='mb-2 '>
                            <img className='w-20 border-4 rounded-full m-auto' src='/Images/user-icon.jpg' alt='user' />
                        </div>
                        <div className='mb-10 text-center'>
                            <h1 className='block text-gray-700 font-bold text-2xl'>{`${data.name}'s profile`}</h1>
                        </div>
                        <div className=''>
                            <div>
                                <div className='flex justify-between mb-4'>
                                    <label>Name</label>

                                    <span>{data.name}</span>
                                </div>
                                <div className='flex justify-between mb-4'>
                                    <label>Username</label>

                                    <span>{data.username}</span>
                                </div>
                                <div className='flex justify-between mb-4'>
                                    <label>Department</label>

                                    <span>{data.department}</span>
                                </div>
                                <div className='flex justify-between mb-4'>
                                    <label>No of Complaint</label>

                                    <span>{No}</span>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>

            </div>
            <div className=' text-center'>
                <button className='bg-blue-500 py-2 px-3 border-2 rounded-md shadow-2xl text-white hover:text-black' onClick={handleLogout}>Log Out</button>
            </div>
        </div>
    )
}

export default Profile