import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Axios from 'axios'


const Complete = () => {




  const params = useParams();
  const complaint_id = params.complaint_id

  useEffect(() => {
    const state = "complete"
    setnewstate(state)
  }, [])
  

  const [newstate, setnewstate] = useState("")
  const navigate = useNavigate();
  const [date, setDate] = useState("")
  const [delay_reason, setdelay_reason ] = useState("")
  const [worker , setWorker] = useState("")

  useEffect(() => {
    const todayDate = () => {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;

      setDate(formattedDate)
    }
    todayDate()
  }, [])

  const newstateRef = useRef();
  newstateRef.current = newstate;

  useEffect(() => {
     const AssignCheck = async() =>{
      try{
        const res = await Axios.get(`http://localhost:3002/assignCheck/${complaint_id}`)
        setWorker(res.data[0].assigned_to)
      }catch(error){
        console.log('Error during Assign Check:', error);

        window.alert('Error getting worker. Please try again later.')
      }
     }
     AssignCheck();
  }, [complaint_id])

  const compeletestate = async () => {
    try {
      const [assignres, workerRes] = await Promise.all([
       Axios.put( `http://localhost:3002/assignedstate/${complaint_id}`, { newstate: newstate, date: date }),
       Axios.put("http://localhost:3002/increment_completed",{worker:worker} )
       ]);
      if (assignres.data.message && workerRes.data.message === "assigned") {
        window.alert('Complaint is updated');
        navigate('/Summary');
      }
      else {
        window.alert('Error updating complaint. Please try again later.')
      }
    } catch (error) {
      console.log('Error during complaint update:', error);

      window.alert('Error updating complaint. Please try again later.');
    }
  };

  const complaintDelay = async () => {
    try {
      const response = await Axios.put(`http://localhost:3002/complaintdelay/${complaint_id}`, { delay_reason:delay_reason });
      if (response.data.message === "delayed") {
        window.alert('Delay reason is given');
        navigate('/Summary');
      }
      else {
        window.alert('Error updating delay reason. Please try again later.')
      }
    } catch (error) {
      console.log('Error during delay reason update:', error);
      window.alert('Error updating delay reason. Please try again later.')
      
    }
  };
  return (
    <div className='shadow-2xl rounded px-8 pt-6 pb-8 mb-4 bg-[#f5f5f5]'>

      <div>
        <div className='mb-10 text-center'>
          <h1 className='block text-gray-700 font-bold text-xl'>
            Complaint Is Completed ?
          </h1>
        </div>
        <div className="mb-4 mt-2 flex  justify-between">
          <label className="block text-gray-700 text-md font-bold mb-2" >If Yes Then Click  :</label>
          <button className=" bg-blue-500 py-2 px-4 border-2 rounded-md shadow-2xl text-white  transition ease-in-out delay-150  hover:scale-110 hover:bg-green-500 duration-300 ..." onClick={compeletestate}>Yes</button >
        </div>
        <div className="mb-4 mt-10 flex-col ">
          <label className="block text-gray-700 text-md font-bold mb-5 text-start" >If No Write The Reason Of Delay :</label>
          <textarea
            className='shadow appearance-none border rounded w-full py-2 px-3 mb-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='delay'
            rows='5'
            placeholder='Write the reason of delay'
            required
            onChange={(e)=>{setdelay_reason(e.target.value)}}
          ></textarea>
          <button  className=" bg-blue-500 py-2 px-4 border-2 rounded-md mt-3 shadow-2xl text-white  transition ease-in-out delay-150  hover:scale-110 hover:bg-red-500 duration-300 ..."onClick={complaintDelay} >Submit Reason</button >
        </div>
        <div className='mt-10 '>
        </div></div>
    </div>
  )
}

export default Complete;