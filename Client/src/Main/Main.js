import React from 'react';
import Nav from '../Components/Nav';
import Axios from 'axios';
import { useState,useEffect } from 'react';

const Main = () => {
  const [complaint, setComplaint] = useState('');
  const [complaint_type, setComplaintType] = useState('');
  const [error, setError] = useState(false);
  const [complaint_id, setComplaintId] = useState(null);

  Axios.defaults.withCredentials = true;

  useEffect(() => {
    getRandomNumber();
  }, []);
  
  const getRandomNumber = () => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    setComplaintId(result);
  };

  const submitComplaint = async () => {
    if (complaint.length === 0 || complaint_type.length === 0) {
      setError(true);
    } else {
      try {
        const res = await Axios.post('http://localhost:3002/complaint', {
          complaint: complaint,
          complaint_type: complaint_type,
          complaint_id: complaint_id,
        });
        if (res.data === 'Error') {
          window.alert('Complaint not filled properly');
        } else {
          window.location.reload();
          window.alert('Complaint filled');
        }
      } catch (error) {
        console.error('Error submitting complaint:', error);
      }
    }
  };


  return (
    <>
      <Nav />

      <div className='w-full mt-10'>
        <div className='max-w-md sm:max-w-lg mx-auto'>
          <form className='bg-[#f5f5f5] shadow-2xl rounded px-8 pt-6 pb-8 mb-4'>
            <div className='mb-10 text-center'>
              <h1 className='block text-gray-700 font-bold text-xl'>
                Enter Your Complaint
              </h1>
            </div>
            <div className='mb-4 flex justify-between'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='complaint_type'>
                Type of Complaint :
              </label>
              <select
                className='px-10 border focus:outline-none focus:shadow-outline'
                id='complaint_type'
                placeholder='select'
                onChange={(e) => {
                  setComplaintType(e.target.value);
                }}
              >
                <option value='' disabled selected>
                  Select your option
                </option>
                <option value='Electrical'>Electrical</option>
                <option value='Civil'>Civil</option>
                <option value='option3'>option3</option>
                <option value='option4'>Option 4</option>
              </select>
            </div>
            {error && complaint_type.length <= 0 ? (
              <label className='text-red-500 text-sm px-2'>
                Complaint type cannot be empty
              </label>
            ) : (
              ''
            )}
            <div className='mb-6 mt-12'>
              <label className='block text-gray-700 text-sm font-bold mb-2' for='complaint'>
                Complaint:
              </label>
              <textarea
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='complaint'
                rows='5'
                placeholder='Enter your Complaint'
                required
                onChange={(e) => {
                  setComplaint(e.target.value);
                }}
              ></textarea>
              {error && complaint.length <= 0 ? (
                <label className='text-red-500 text-sm px-2'>
                  Complaint cannot be empty
                </label>
              ) : (
                ''
              )}
            </div>
            <div className='flex items-center justify-center'>
              <button
                onClick={() => {
                  submitComplaint();
                  getRandomNumber();
                }}
                className='bg-blue-500 py-2 px-4 border-2 rounded-md shadow-2xl text-white  transition ease-in-out delay-150  hover:scale-110 hover:bg-green-500 duration-300 ...'
                type='button'
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Main;