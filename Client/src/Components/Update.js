import React from 'react'
import { useEffect ,useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import  Axios from 'axios'

const Update = () => {
  const [update, setupdate] = useState(false)

  const updateButton=()=>{
    setupdate(true)
   
  } 
  const cancelButtons=()=>{
    setupdate(false)

  }
  const [showButton, setShowButton] = useState(true);

  const toggleButton = () => {
    setShowButton(!showButton);
  };
  const [Complaint, setComplaint] = useState({});
  const params = useParams();
  const complaint_id = params.complaint_id

  useEffect(() => {
    const singlecomplaintdata = async()=>{
     await Axios.get(`http://localhost:3002/singlecomplaint_data/${complaint_id}`)
    .then((res) =>{
        setComplaint(res.data[0])
        if(Complaint.state!=="pending"){
            setShowButton(false);
        }
        else{
            setShowButton(true)
        }
    } ) 
    }
    singlecomplaintdata();
    },[complaint_id,Complaint.state]);

    const [newcomplaint, setnewcomplaint] = useState("")
    const navigate = useNavigate();

    const updateComplaint = async()=>{
       await Axios.put(`http://localhost:3002/newcomplaint/${complaint_id}`,{newcomplaint:newcomplaint})
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
     {showButton&& <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>{toggleButton();updateButton()}} id="btn">update</button>}
      {update?<div><textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="message" rows="5" placeholder="Enter your Complaint" required onChange={(e) => {
                            setnewcomplaint(e.target.value)
                        }}></textarea>
     <div className='mt-4 mb-4'> <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-3" onClick={updateComplaint}>Submit
        </button >
        <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-3" onClick={()=>{cancelButtons();toggleButton()}}>cancel</button></div></div>:""}
    </div>
  )
}

export default Update;