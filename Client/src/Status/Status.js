import React from 'react'
import Nav from '../Components/Nav'
import Axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Delete from '../Components/Delete'
import Update from '../Components/Update'
import Assign from '../Components/Assign'
import Feedback from '../Components/Feedback'
import Complete from '../Components/Complete'

const Status = () => {


    const [Complaint, setComplaint] = useState({});
    const params = useParams();
    const complaint_id = params.complaint_id

    const [ Assigned, setAssigned]= useState(false)
   const[complete,setcomplete]=useState(false);
    useEffect(() => {
        const singlecomplaintdata = async()=>{
           await Axios.get(`http://localhost:3002/singlecomplaint_data/${complaint_id}`)
            .then((res) => {
                setComplaint(res.data[0])
                
            })
        };
        singlecomplaintdata();
        
    }, [complaint_id]);

    useEffect(() => {
        if(Complaint.state==="assigned"){
            setAssigned(true);
        }
        else{
            setAssigned(false);
        }
      
    }, [Complaint.state])
    useEffect(() => {
        if(Complaint.state==="confirmed"){
            setcomplete(true)
        }
        else{
            setcomplete(false)
        }
      
    }, [Complaint.state])
    
    

    const [joindata, setjoindata] = useState({})
    useEffect(() => {
        const tablejoin= async()=>{
           await Axios.get(`http://localhost:3002/tablejoin/${complaint_id}`)
            .then((res) => {
                setjoindata(res.data[0])
            })
        }
        tablejoin();
        
    }, [complaint_id])

    const [data, setdata] = useState("")
    useEffect(() => {
        const userdata = async()=>{
            await Axios.get('http://localhost:3002')
            .then((res) =>{
                setdata(res.data[0].role)
            } ) 
        }
        userdata();
        },[data]);

    const [role, setrole] = useState(false)
    useEffect(() => {
        if (data === "General") {
            setrole(true)
        }
        else{
            setrole(false)
        }
    }, [data])
    
    const [assignData, setAssignData] = useState("")
    useEffect(() => {
        const assignCheck = async()=> {
           await Axios.get(`http://localhost:3002/assignCheck/${complaint_id}`)
            .then((res) => {
                setAssignData(res.data[0])
                
            })
        }
        assignCheck();
    }, [complaint_id])

    const [feedbackcheck, setfeedbackcheck] = useState(false)
    useEffect(() => {
        const feedbackdata = async() =>{
          await Axios.get(`http://localhost:3002/feedbackdata/${complaint_id}`)
            .then((res) => {
                if(res.data.message==="Nodata"){
                    setfeedbackcheck(true)
                }
                else{
                    setfeedbackcheck(false)
                }
            })
        }
        feedbackdata();
    }, [complaint_id])


    return (
        <div>
            <Nav />
            <div className='mt-5'>
                <div className=' mx-auto max-w-md sm:max-w-lg'>
                    <div class="bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4 ">
                        <div className='mb-10 text-center'>
                            <h1 className='block text-gray-700 font-bold text-xl'>
                                Complaint Status
                            </h1>
                        </div>
                        <div className='divide-y-2'>
                            <div>
                                <div className='flex justify-between mb-4'>
                                    <label>Name</label>

                                    <span>{joindata.name}</span>
                                </div>
                                <div className='flex justify-between mb-4'>
                                    <label>Username</label>

                                    <span>{Complaint.username}</span>
                                </div>
                                <div className='flex justify-between mb-4'>
                                    <label>Department</label>

                                    <span>{joindata.department}</span>
                                </div>
                                <div className='flex justify-between mb-4'>
                                    <label>Type of Complaint</label>

                                    <span>{Complaint.complaint_type}</span>
                                </div>
                                <div className='flex justify-between mb-4'>
                                    <label>Complaint</label>

                                    <span>{Complaint.complaint}</span>
                                </div>
                            </div>
                            <div className=''>
                                <div className='pt-4 flex justify-between'>
                                    <label>Status</label>
                                    <span>{Complaint.state}</span>
                                </div>
                                {Assigned || complete ? <div className='pt-2 flex justify-between'>
                                    <label>Assigned To</label>
                                    <span>{assignData.assigned_to}</span>
                                </div> : ""}

                            </div>

                        </div>
                    </div>
                    
                    <div className='mx-auto text-center mb-4'><Delete /></div>
                    <div className='mx-auto text-center mb-10 mt-10 '>{Assigned && data !=="General"? <Complete />:""}</div>
                    <div className='mx-auto  text-center mt-3'>{role?<Update /> :<Assign />}</div>
                    <div className='mx-auto text-center mb-4'>{complete && feedbackcheck ?<Feedback />:""}</div>
                </div>


            </div></div>
    )
}

export default Status