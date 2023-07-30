import React from 'react'
import { useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import  Axios from 'axios'

const Complete = () => {
  



  const params = useParams();
  const complaint_id = params.complaint_id

 

    const [newstate, setnewstate] = useState("")
    const navigate = useNavigate();

    const compeletestate = async()=>{
        await Axios.put(`http://localhost:3002/assignedstate/${complaint_id}`,{newstate:newstate})
        .then((res)=>{
            if(res.data==="Error"){
                window.alert("Complaint is not updated")
            }
            else{
                window.alert("Complaint is updated")
                navigate("/Summary")
                
            }

        })
    }
  return (
    <div>
     
     <div>
        <div class="mb-4 mt-2 flex  justify-between">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Change Status :</label>
                                <select className='px-10' id="cars" placeholder='select' defaultValue={'default'} onChange={(e) => {
                            setnewstate(e.target.value)
                        }}>         <option value="default" disabled>Select your option</option>
                                    <option value="confirmed">Complete</option>
                                </select>
                            </div>
     <div className='mt-10 '> <button  className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-3" onClick={compeletestate}>Submit
        </button >
       </div></div>
    </div>
  )
}

export default Complete;