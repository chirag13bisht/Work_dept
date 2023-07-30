import React from 'react'
import { useParams } from 'react-router-dom'
import  Axios  from 'axios';
import { useNavigate } from 'react-router-dom';

const Delete = () => {

    const params = useParams();
    const complaint_id = params.complaint_id
   
    const navigate = useNavigate();
    const complaintDelete= async()=>{
       await Axios.delete(`http://localhost:3002/singlecomplaint_delete/${complaint_id}`)
        .then(res=>{
            if(res.data === "Error"){
                window.alert("Complaint not deleted")
            }
            else{
                window.alert("complaint deleted")
                navigate('/Summary')
            }
        }
        )
    }
  return (
    <div ><button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={complaintDelete}>Delete</button></div>
  )
}

export default Delete