import React from 'react'
import Nav from '../Components/Nav'
import  Axios from 'axios'
import { useEffect ,useState} from 'react'
import { useParams } from 'react-router-dom'
import Delete from '../Components/Delete'

const Status = () => {
    
    Axios.defaults.withCredentials = true;
    const [data, setdata] = useState("")
    useEffect(() => {
        Axios.get('http://localhost:3002')
        .then((res) =>{
            setdata(res.data[0])
        } ) 
        },[]);
    const [Complaint, setComplaint] = useState({});
    const params = useParams();
    const complaint_id = params.complaint_id
  
    
    useEffect(() => {
        Axios.get(`http://localhost:3002/singlecomplaint_data/${complaint_id}`)
        .then((res) =>{
            setComplaint(res.data[0])
        } ) 
        },[complaint_id]);
    return (
        <div>
            <Nav />
            <div className='mt-5'>
                <div className=' mx-auto max-w-lg'>
                    <div class="bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4 ">
                        <div className='mb-10 text-center'>
                            <h1 className='block text-gray-700 font-bold text-xl'>
                                Complaint Status
                            </h1>
                        </div>
                        <div  className='divide-y-2'>
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
                                    <label>Type of Complaint</label>

                                    <span>{Complaint.complaint_type}</span>
                                </div>
                                <div className='flex justify-between mb-4'>
                                    <label>Complaint</label>

                                    <span>{Complaint.complaint}</span>
                                </div>
                            </div>
                            <div className='pt-4 flex justify-between'>
                                <label>Status</label>
                                <span>{Complaint.state}</span>
                            </div>
                        </div>
                    </div>
                    <div className='mx-auto w-20'><Delete/></div>
                </div>
                

            </div></div>
    )
}

export default Status