import React from 'react'
import { useState,useEffect, useRef} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import  Axios from 'axios'

const Complete = () => {
  



  const params = useParams();
  const complaint_id = params.complaint_id

 

    const [newstate, setnewstate] = useState("")
    const navigate = useNavigate();
    const [date , setDate] =useState("")

    useEffect(() => {
      const todayDate = ()=>{
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

    const compeletestate = async () => {
      try {
        const response = await Axios.put(`http://localhost:3002/assignedstate/${complaint_id}`, { newstate: newstate,date:date });
        if(response.data.message==="assigned"){
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
  return (
    <div className='shadow-2xl rounded px-8 pt-6 pb-8 mb-4 bg-[#f5f5f5]'>
     
     <div>
     <div className='mb-10 text-center'>
                <h1 className='block text-gray-700 font-bold text-xl'>
                  Complaint Is Completed ?
                </h1>
              </div>
        <div className="mb-4 mt-2 flex  justify-between">
                                <label className="block text-gray-700 text-md font-bold mb-2" for="email">Change Status :</label>
                                <select className='px-10 focus:outline-none focus:shadow-outline border' id="cars" placeholder='select' defaultValue={'default'} onChange={(e) => {
                            setnewstate(e.target.value)
                        }}>         <option value="default" disabled>Select your option</option>
                                    <option value="complete">Complete</option>
                                </select>
                            </div>
                            <div className="mb-4 mt-2 flex  justify-between">
                                <label className="block text-gray-700 text-md font-bold mb-2" for="email">Current Date :</label>
                                <p className='px-10'>{date}</p>
                            </div>
     <div className='mt-10 '> <button  className=" bg-blue-500 py-2 px-4 border-2 rounded-md shadow-2xl text-white  transition ease-in-out delay-150  hover:scale-110 hover:bg-green-500 duration-300 ..." onClick={compeletestate}>Submit
        </button >
       </div></div>
    </div>
  )
}

export default Complete;