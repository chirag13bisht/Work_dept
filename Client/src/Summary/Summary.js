import React from 'react'
import Nav from '../Components/Nav'
import { useState,useEffect } from 'react';
import Axios  from 'axios';
import { Link } from 'react-router-dom';





const Summary = () => {

    const [data, setdata] = useState([ ])
    useEffect(() => {
        const complaintdata = async() =>{
            Axios.get('http://localhost:3002/complaint_data')
            .then((res) =>{
                setdata(res.data)
            } ) 
        }
        complaintdata();
        },[]);

    const [order, setorder]= useState("ASC");
    const sorting=(col)=>{
        if(order==="ASC"){
            const sorted = [...data].sort((a,b)=>
             a[col].toLowerCase()>b[col].toLowerCase()?1:-1);
             setdata(sorted);
             setorder("DSC")
        }
        if(order==="DSC"){
            const sorted = [...data].sort((a,b)=>
             a[col].toLowerCase()<b[col].toLowerCase()?1:-1);
             setdata(sorted);
             setorder("ASC")
        }
    }

    const [allorder, setallorder]= useState("ASC");
    const allsorting=(col)=>{
        if(allorder==="ASC"){
            const sorted = [...alldata].sort((a,b)=>
             a[col].toLowerCase()>b[col].toLowerCase()?1:-1);
             setalldata(sorted);
             setallorder("DSC")
        }
        if(allorder==="DSC"){
            const sorted = [...alldata].sort((a,b)=>
             a[col].toLowerCase()<b[col].toLowerCase()?1:-1);
             setalldata(sorted);
             setallorder("ASC")
        }
    }

   
  

        Axios.defaults.withCredentials = true;
        const [alldata, setalldata] = useState([ ])
        useEffect(() => {
            const allcomplaintdata = async() =>{
               await Axios.get('http://localhost:3002/allcomplaint_data')
            .then((res) =>{
                setalldata(res.data)
            } ) 
            }
            allcomplaintdata();
            },[]);

            Axios.defaults.withCredentials = true;
            const [role, setrole] = useState("")
            useEffect(() => {
                const userdata = async()=>{
                   await  Axios.get('http://localhost:3002')
                .then((res) =>{
                    setrole(res.data[0].role)
                } ) 
                }
                userdata();
                },[]);


                const[search,setSearch]= useState('');
               
            
        if(role==="General"){
            return (
        

                <div>
                    <Nav />
                    <div class="flex overflow-hidden shadow-2xl m-10 flex-col">
                        <div className='mb-10 text-center'>
                            <h1 className='block text-gray-700 font-bold text-2xl'>Summary of Complaints</h1>
                        </div>
                        <div className='flex justify-center '>       
    <input onChange={(e)=> setSearch(e.target.value.toLowerCase())} 
     type="text" id="default-input" class="bg-gray-50 border border-gray-300 text-center justify-between items-center text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-11/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
      dark:focus:ring-blue-500 dark:focus:border-blue-500 " placeholder='Search "Status or complaint id or complaint type"'/></div>  
                        <div class="overflow-x-auto  sm:-mx-6 lg:-mx-8">
                            <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                <div class="overflow-hidden">
                                    <table class="min-w-full text-left text-sm font-light ">
                                        <thead class="border-b font-medium dark:border-neutral-500">
                                            <tr className='text-center'>
                                            <th><button  class="px-4 py-4 " onClick={()=>sorting("complaint_id")}>Complaint Id</button></th>
                                                <th><button  class="px-6 py-4  " onClick={()=>sorting("username")}>Username</button></th>
                                               <th> <button  class="px-6 py-4 " onClick={()=>sorting("complaint_type")}>Complaint Type</button></th>
                                               <th> <button  class="px-6 py-4 " onClick={()=>sorting("complaint")}>Complaint</button></th>
                                               <th> <button  class="px-6 py-4 " onClick={()=>sorting("state")}>Status</button></th>
                                            </tr>
                                        </thead>
                                        <tbody>{data.filter((item)=>{
                                            return search.toLowerCase() === ''
                                            ? item
                                            :(item.username.toLowerCase().includes(search)
                                            ||item.complaint_type.toLowerCase().includes(search)
                                            ||item.complaint_id.toLowerCase().includes(search)
                                            ||item.state.toLowerCase().includes(search)
                                            ||item.complaint.toLowerCase().includes(search));;
                                        }).map((item)=>{
                                            return(
                                            <tr class="border-b dark:border-neutral-500 text-center" key={item.complaint_id}>
                                               <td class="whitespace-nowrap px-6 py-4" >{item.complaint_id}</td> 
                                                <td class="whitespace-nowrap px-6 py-4" >{item.username}</td>
                                                <td class="whitespace-nowrap px-6 py-4" >{item.complaint_type}</td>
                                                <td class="whitespace-nowrap px-6 py-4" >{item.complaint}</td>
                                                <td class="whitespace-nowrap px-6 py-4">{item.state}</td>
                                                <Link to={`/Status/${item.complaint_id}`}>  <td class="whitespace-nowrap px-6 py-4"><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Check</button></td> </Link>
                                            </tr>
                                            )})}
                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
        
                </div>
            )

        }
        else{
            return (
        

                <div>
                    <Nav />
                    <div class="flex overflow-hidden shadow-2xl m-10 flex-col">
                        <div></div>
                        <div className='mb-10 text-center '>
                            <h1 className='block text-gray-700 font-bold mx-auto text-2xl'>Summary of Complaints</h1>
               
                        </div>
                        <div className='flex justify-center'>       
    <input onChange={(e)=> setSearch(e.target.value.toLowerCase())} 
     type="text" id="default-input" class="bg-gray-50 border border-gray-300 text-center justify-between items-center text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-11/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
      dark:focus:ring-blue-500 dark:focus:border-blue-500 " placeholder='Search "username or complaint id or complaint type"'/></div>  

                        
                        <div class="overflow-x-auto  sm:-mx-6 lg:-mx-8">
                            <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                <div class="overflow-hidden">
                                    <table class="min-w-full text-left text-sm font-light">
                                        <thead class="border-b font-medium dark:border-neutral-500">
                                            <tr className='text-center '>
                                               <th><button  class="px-4 py-4 " onClick={()=>allsorting("complaint_id")}>Complaint Id</button></th>
                                                <th><button  class="px-6 py-4  " onClick={()=>allsorting("username")}>Username</button></th>
                                               <th> <button  class="px-6 py-4 " onClick={()=>allsorting("complaint_type")}>Complaint Type</button></th>
                                               <th> <button  class="px-6 py-4 " onClick={()=>allsorting("complaint")}>Complaint</button></th>
                                               <th> <button  class="px-6 py-4 " onClick={()=>allsorting("state")}>Status</button></th>
                                            </tr>
                                        </thead>
                                        <tbody>{alldata.filter((item)=>{
                                            return search.toLowerCase() === ''
                                            ? item
                                            :(item.username.toLowerCase().includes(search)
                                            ||item.complaint_type.toLowerCase().includes(search)
                                            ||item.complaint_id.toLowerCase().includes(search)
                                            ||item.state.toLowerCase().includes(search)
                                            ||item.complaint.toLowerCase().includes(search));
                                        }).map((item)=>{
                                            return(
                                            <tr class="border-b dark:border-neutral-500 text-center" key={item.complaint_id}>
                                               <td class="whitespace-nowrap px-6 py-4" >{item.complaint_id}</td> 
                                                <td class="whitespace-nowrap px-6 py-4" >{item.username}</td>
                                                <td class="whitespace-nowrap px-6 py-4" >{item.complaint_type}</td>
                                                <td class="whitespace-nowrap px-6 py-4" >{item.complaint}</td>
                                                <td class="whitespace-nowrap px-6 py-4">{item.state}</td>
                                                <Link to={`/Status/${item.complaint_id}`}>  <td class="whitespace-nowrap px-6 py-4"><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Check</button></td> </Link>
                                            </tr>
                                            )})}
                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
        
                </div>
            )
        }

    
}

export default Summary