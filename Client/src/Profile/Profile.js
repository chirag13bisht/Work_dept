import React from 'react'
import Nav from '../Components/Nav'
import Axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'



const Profile = () => {
    const Navigate = useNavigate();
    Axios.defaults.withCredentials = true;
    const [data, setData] = useState(null);
    const [noOfComplaints, setNoOfComplaints] = useState(null);
    const [loading, setLoading] = useState(true); 
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const userData = await Axios.get('http://localhost:3002');
          setData(userData.data[0]);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching user data:', error);
          setLoading(false);
        }
      };
      fetchData();
    }, []);
  
    useEffect(() => {
      const fetchComplaintsData = async () => {
        try {
          const complaintsData = await Axios.get('http://localhost:3002/complaint_data');
          setNoOfComplaints(complaintsData.data.length);
        } catch (error) {
          console.error('Error fetching complaints data:', error);
        }
      };
      fetchComplaintsData();
    }, []);
  
    const handleLogout = async (e) => {
      e.preventDefault();
      try {
        await Axios.get('http://localhost:3002/logout');
        window.alert('Logged out');
        Navigate('/');
      } catch (error) {
        console.error('Error during logout:', error);
      }
    };
  
    return (
      <div className=''>
        <Nav />
        <div className='mt-10'>
          <div className='mx-auto max-w-md sm:max-w-lg'>
            {loading ? (
              <div className='text-center'>Loading...</div>
            ) : (
              <div className='bg-[#f5f5f5] shadow-2xl  rounded px-8 pt-6 pb-8 mb-4'>
                <div className='mb-2 '>
                  <img
                    className='w-20 border-4 rounded-full m-auto '
                    src='/Images/user-icon.jpg'
                    alt='user'
                  />
                </div>
                <div className='mb-10 text-center '>
                  <h1 className='block text-gray-700 font-bold text-2xl'>{`${data.name.toUpperCase()}'s profile`}</h1>
                </div>
                <div className=''>
                  <div>
                    {/* Add more styling and formatting */}
                    <div className='flex justify-between mb-4'>
                      <span className='font-semibold'>Name:</span>
                      <span>{data.name.toUpperCase()}</span>
                    </div>
                    <div className='flex justify-between mb-4'>
                      <span className='font-semibold'>Username:</span>
                      <span>{data.username.toUpperCase()}</span>
                    </div>
                    <div className='flex justify-between mb-4'>
                      <span className='font-semibold'>Department:</span>
                      <span>{data.department.toUpperCase()}</span>
                    </div>
                    <div className='flex justify-between mb-4'>
                      <span className='font-semibold'>No of Complaints:</span>
                      <span>{noOfComplaints}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='text-center'>
          <button
            className='bg-blue-500 py-2 px-4 border-2 rounded-md shadow-2xl text-white  transition ease-in-out delay-150  hover:scale-110 hover:bg-red-500 duration-300 ...'
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      </div>
    );
  };
  
  export default Profile;