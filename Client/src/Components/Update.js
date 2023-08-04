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
    const singlecomplaintdata = async () => {
      try {
        const response = await Axios.get(
          `http://localhost:3002/singlecomplaint_data/${complaint_id}`
        );
        setComplaint(response.data[0]);
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
  }, [complaint_id,Complaint.state]);

    const [newcomplaint, setnewcomplaint] = useState("")
    const navigate = useNavigate();

    const updateComplaint = async () => {
      try {
        await Axios.put(`http://localhost:3002/newcomplaint/${complaint_id}`, {
          newcomplaint: newcomplaint,
        });
  
        window.alert('Complaint is updated');
        navigate('/Summary');
      } catch (error) {
        console.log('Error during complaint update:', error);

        window.alert('Error updating complaint. Please try again later.');
      }
    };
  return (
    <div>
     {showButton&& <button  className="bg-blue-500 py-2 px-4 border-2 rounded-md shadow-2xl text-white  transition ease-in-out delay-150  hover:scale-110 hover:bg-green-500 duration-300 ..." onClick={()=>{toggleButton();updateButton()}} id="btn">update</button>}
      {update?<div><textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="message" rows="5" placeholder="Enter your Complaint" required onChange={(e) => {
                            setnewcomplaint(e.target.value)
                        }}></textarea>
     <div className='mt-4 mb-4'> <button  className="bg-blue-500 py-2 px-4 border-2 rounded-md mx-3 shadow-2xl text-white  transition ease-in-out delay-150  hover:scale-110 hover:bg-green-500 duration-300 ..." onClick={updateComplaint}>Submit
        </button >
        <button  className="bg-blue-500 py-2 px-4 border-2 rounded-md mx-3 shadow-2xl text-white  transition ease-in-out delay-150  hover:scale-110 hover:bg-red-500 duration-300 ..." onClick={()=>{cancelButtons();toggleButton()}}>cancel</button></div></div>:""}
    </div>
  )
}

export default Update;