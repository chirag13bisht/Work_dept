import React from 'react'
import Nav from '../Components/Nav'
import  Axios from 'axios'
import { useEffect ,useState} from 'react'


const Main = () => {

    Axios.defaults.withCredentials = true;
    const [data, setdata] = useState("")
    useEffect(() => {
        Axios.get('http://localhost:3002')
        .then((res) =>{
            setdata(res.data[0])
        } ) 
        });

   
    const [complaint, setcomplaint] = useState("");
    const [complaint_type, setcomplaint_type] = useState("");
    const [error, seterror] = useState(false);
    const [complaint_id, setcomplaint_id] = useState(null);

    Axios.defaults.withCredentials = true;

    const submitComplaint = () => {
        if(complaint.length===0 || complaint_type.length===0){
            seterror(true);
        }    
        else {
            Axios.post('http://localhost:3002/complaint', { complaint: complaint, complaint_type: complaint_type,complaint_id:complaint_id})
           .then(res=>{
            if(res.data === "Error"){
                window.alert("Complaint not filled properly")
            }
            else{
                window.alert("Complaint filled")
            }
         
           })
           .catch(error => console.log(error));  
        }
        
    }
    

    const getRandomNumber = () => {
        let result = '';
        const characters =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < 8; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        setcomplaint_id(result);
      };

    return (
        <>
            <Nav />
            <div className='justify-center  mt-5 '>
                <div className='float-left w-1/2'>
                    <div className=' mx-auto max-w-sm'>
                        <div class="bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4 ">
                            <div className='mb-10 text-center'>
                                <h1 className='block text-gray-700 font-bold text-xl'>
                                    User Information
                                </h1>
                            </div>
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
                        </div>
                    </div>
                </div>

                <div className='w-1/2 float-right'>

                    <div class="max-w-md mx-auto">
                        <form class="bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4">
                            <div className='mb-10 text-center'>
                                <h1 className='block text-gray-700 font-bold text-xl' >Enter Your Complaint</h1>
                            </div>
                            <div class="mb-4 flex  justify-between">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Type of Complaint :</label>
                                <select className='px-10' id="cars" placeholder='select' onChange={(e) => {
                            setcomplaint_type(e.target.value)
                        }}>         <option value="" disabled selected>Select your option</option>
                                    <option value="Electrical">Electrical</option>
                                    <option value="Civil">Civil</option>
                                    <option value="option3">option3</option>
                                    <option value="option4">Option 4</option>
                                </select>
                                
                            </div>
                            {error &&complaint_type.length<=0?<label className='text-red-500 text-sm px-2 '>Complaint type cannot be empty</label>:""}
                            <div class="mb-6">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="message">Complaint</label>
                                <textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="message" rows="5" placeholder="Enter your Complaint" required onChange={(e) => {
                            setcomplaint(e.target.value)
                        }}></textarea>
                            {error &&complaint.length<=0?<label className='text-red-500 text-sm px-2 '>Complaint cannot be empty</label>:""}
                            </div>
                            <div class="flex items-center justify-center">
                                <button onClick={()=>{getRandomNumber();submitComplaint()}} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>

        </>
    )

}


export default Main