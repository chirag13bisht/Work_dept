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
  const [worker_role, setWorker_Role ]= useState("")
  const [worker, setWorker ]= useState("")
  
  const toggleButton = () => {
    setShowButton(!showButton);
  };
  const [Complaint, setComplaint] = useState({});
  const params = useParams();
  const complaint_id = params.complaint_id

  useEffect(() => {
    const state = "assigned"
    setnewstate(state)
   
  }, [])
  

  useEffect(() => {
    const singlecomplaintdata = async () => {
      try {
        const response = await Axios.get(
          `http://localhost:3002/singlecomplaint_data/${complaint_id}`
        );
        setComplaint(response.data[0]);
        const complaintType = response.data[0].complaint_type;
        setWorker_Role(complaintType);
        if (Complaint.state !== 'pending') {
          setShowButton(false);
          
        } else {
          setShowButton(true);
        }
      } catch (error) {
        console.log('Error fetching single complaint data:', error);
      }
    };
    singlecomplaintdata();
  }, [complaint_id,Complaint.state,Complaint.complaint_type]);


  useEffect(() => {
    const workersData = async () => {
      try {
        console.log(worker_role);
        const response = await Axios.get(
          `http://localhost:3002/workers_data/${worker_role}`
        );
        setWorker(response.data);
      } catch (error) {
        console.log('Error fetching worker data:', error);
      }
    };
    workersData();
    
  }, [worker_role]);
   console.log(worker)
    const [assignedto, setassignedto] = useState("")
    const [newstate, setnewstate] = useState("")
    const navigate = useNavigate();

    const assignComplaint = async () => {
      try {
        await Axios.all([
          Axios.put(`http://localhost:3002/assignedstate/${complaint_id}`, { newstate: newstate }),
          Axios.post(`http://localhost:3002/assigned/${complaint_id}`, { assignedto: assignedto }),
          Axios.put("http://localhost:3002/increment_assigned",{  assignedto: assignedto })
        ]);
        window.alert('Complaint is assigned');
        navigate('/Summary');
      } catch (error) {
        console.log('Error during complaint assignment:', error);
        window.alert('Error assigning complaint. Please try again later.');
      }
    };
  return (
    <div  className={`shadow-2xl rounded px-8 pt-6 pb-8 mb-4 ${
      assign ? 'bg-[#f5f5f5]' : 'bg-white'
    } ${assign ? 'shadow-2xl' : 'shadow-none'}`}>
     {showButton&& <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>{toggleButton();assignButton()}} id="btn">Assign</button>}
      {assign?<div>
        <div className='mb-10 mt-2 text-center'>
                <h1 className='block text-gray-700 font-bold text-xl'>
                  Assign The Complaint 
                </h1>
              </div>
        <div className="mb-4 flex  justify-between">
                                <label className="block text-gray-700 text-sm font-bold mb-2" >Status :</label>
                                <span className='px-10  '  >
                                    Assigned
                                </span>
                            </div>
                            <div className="mb-10 mt-5 flex  justify-between">
                                <label className="block text-gray-700 text-md font-bold mb-2">Select the Worker :</label>
                                <select
            className='px-10 focus:outline-none focus:shadow-outline border'
            id="cars"
            placeholder='select'
            defaultValue={'default'}
            onChange={(e) => { setassignedto(e.target.value) }} // Store the selected worker in state
          >
            <option value="default" disabled>Select your option</option>
            {worker.map((workerData) => (
              <option key={workerData.worker_name} value={workerData.worker_name}>{workerData.worker_name}</option>
            ))}
          </select>
                            </div>
     <div className='mt-4 mb-4'> <button  className="bg-blue-500 py-2 px-4 border-2 rounded-md mx-3 shadow-2xl text-white  transition ease-in-out delay-150  hover:scale-110 hover:bg-green-500 duration-300 ..." onClick={assignComplaint}>Submit
        </button >
        <button  className="bg-blue-500 py-2 px-4 border-2 rounded-md shadow-2xl text-white mx-3 transition ease-in-out delay-150  hover:scale-110 hover:bg-red-500 duration-300 ..." onClick={()=>{cancelButtons();toggleButton()}}>cancel</button></div></div>:""}
    </div>
  )
}

export default Assign;