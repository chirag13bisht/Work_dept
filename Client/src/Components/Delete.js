import React from 'react'
import { useParams } from 'react-router-dom'
import  Axios  from 'axios';
import { useNavigate } from 'react-router-dom';

const Delete = () => {

    const params = useParams();
    const complaint_id = params.complaint_id
   
    const navigate = useNavigate();
    const complaintDelete = async () => {
      try {
        await Axios.delete(`http://localhost:3002/singlecomplaint_delete/${complaint_id}`);
        window.alert('Complaint deleted');
        navigate('/Summary');
      } catch (error) {
        console.log('Error during complaint delete:', error);
        window.alert('Error deleting complaint. Please try again later.');
      }
    };
  return (
    <div ><button  className="bg-blue-500 py-2 px-4 border-2 rounded-md shadow-2xl text-white  transition ease-in-out delay-150  hover:scale-110 hover:bg-red-500 duration-300 ..." onClick={complaintDelete}>Delete</button></div>
  )
}

export default Delete