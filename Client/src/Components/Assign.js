import React from 'react'
import { useEffect ,useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import  Axios from 'axios'

const Assign = () => {
  const [assign, setassign] = useState(false)

  const assignButton=()=>{
    setassign(true)
   
  } 
  const cancelButtons=()=>{
    setassign(false)

  }
  const [showButton, setShowButton] = useState(true);

  const toggleButton = () => {
    setShowButton(!showButton);
  };
  const [Complaint, setComplaint] = useState({});
  const params = useParams();
  const complaint_id = params.complaint_id

  useEffect(() => {
    Axios.get(`http://localhost:3002/singlecomplaint_data/${complaint_id}`)
    .then((res) =>{
        setComplaint(res.data[0])
        if(Complaint.state!=="pending"){
            setShowButton(false);
        }
        else{
            setShowButton(true)
        }
    } ) 
    },[complaint_id,Complaint.state]);

    const [assignedto, setassignedto] = useState("")
    const [newstate, setnewstate] = useState("")
    const navigate = useNavigate();

    const assignComplaint = async()=>{
        await Axios.all([
          Axios.put(`http://localhost:3002/assignedstate/${complaint_id}`,{newstate:newstate}),
          Axios.post(`http://localhost:3002/assigned/${complaint_id}`,{assignedto:assignedto})])
          .then(Axios.spread((stateres,assignres)=>{
            if(stateres.data==="Error"&&assignres.data==="Error"){
                window.alert("Complaint is not assigned")
            }
            else{
                window.alert("Complaint is assigned")
                navigate("/Summary")
                
            }

        }))
    }
  return (
    <div>
     {showButton&& <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>{toggleButton();assignButton()}} id="btn">Assign</button>}
      {assign?<div>
        <div class="mb-4 flex  justify-between">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Change Status :</label>
                                <select className='px-10' id="cars" placeholder='select' defaultValue={'default'} onChange={(e) => {
                            setnewstate(e.target.value)
                        }}>         <option value="default" disabled>Select your option</option>
                                    <option value="assigned">Assigned</option>
                                    <option value="pending">pending</option>
                                </select>
                            </div>
        <textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="message" rows="5" placeholder="Assiging to" required onChange={(e) => {
                            setassignedto(e.target.value)
                        }}></textarea>
     <div className='mt-4 mb-4'> <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-3" onClick={assignComplaint}>Submit
        </button >
        <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-3" onClick={()=>{cancelButtons();toggleButton()}}>cancel</button></div></div>:""}
    </div>
  )
}

export default Assign;