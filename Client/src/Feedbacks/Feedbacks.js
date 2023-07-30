import React from 'react'
import Nav from '../Components/Nav'
import { useState,useEffect } from 'react';
import Axios  from 'axios';

const Feedbacks = () => {

    const [data, setdata] = useState([ ])
    useEffect(() => {
        const feedbackjoin = async() =>{
           await Axios.get('http://localhost:3002/feedbackjoin')
        .then((res) =>{
            setdata(res.data)
        } ) 
        }
        feedbackjoin();
        },[data]);

    

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

        const[search,setSearch]= useState('');
               
            
       
            return (
        

                <div>
                    <Nav />
                    <div class="flex  overflow-hidden shadow-2xl m-10 flex-col">
                        <div className='mb-10 text-center'>
                            <h1 className='block text-gray-700 font-bold text-2xl'>User's Feedback</h1>
                        </div>
                        <div className='flex justify-center'>       
    <input onChange={(e)=> setSearch(e.target.value.toLowerCase())} 
     type="text" id="default-input" class="bg-gray-50 border border-gray-300 text-center justify-between items-center text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-11/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
      dark:focus:ring-blue-500 dark:focus:border-blue-500 " placeholder='Search "Status or complaint id or complaint type"'/></div>  
                        <div class="overflow-auto  sm:-mx-6 lg:-mx-8">
                            <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                <div class="overflow-hidden">
                                    <table class="min-w-full text-left text-sm font-light">
                                        <thead class="border-b font-medium dark:border-neutral-500">
                                            <tr className='text-center'>
                                            <th><button  class="px-4 py-4 " onClick={()=>sorting("complaint_id")}>Complaint Id</button></th>
                                                <th><button  class="px-6 py-4  " onClick={()=>sorting("username")}>Username</button></th>
                                               <th> <button  class="px-6 py-4 " onClick={()=>sorting("complaint")}>Complaint</button></th>
                                               <th> <button  class="px-6 py-4 " onClick={()=>sorting("feedback")}>Feedback</button></th>
                                               <th> <button  class="px-6 py-4 " onClick={()=>sorting("feedback_date")}>Feedback date</button></th>
                                               <th> <button  class="px-6 py-4 " onClick={()=>sorting("rate")}>Feedback Rating</button></th>

                                            </tr>
                                        </thead>
                                        <tbody>{data.filter((item)=>{
                                            return search.toLowerCase() === ''
                                            ? item
                                            :(item.username.toLowerCase().includes(search)
                                            ||item.feedbacks.toLowerCase().includes(search)
                                            ||item.complaint_id.toLowerCase().includes(search)
                                            ||item.complaint.toLowerCase().includes(search)
                                            ||item.feedback_date.toLowerCase().includes(search)
                                            ||item.rate.toLowerCase().includes(search));;
                                        }).map((item)=>{
                                            return(
                                                item ?
                                            <tr class="border-b dark:border-neutral-500 text-center" key={item.complaint_id}>
                                               <td class="whitespace-nowrap px-6 py-4" >{item.complaint_id}</td> 
                                                <td class="whitespace-nowrap px-6 py-4" >{item.username}</td>
                                                <td class="whitespace-nowrap px-6 py-4" >{item.complaint}</td>
                                                <td class="whitespace-nowrap px-6 py-4" >{item.feedbacks}</td>
                                                <td class="whitespace-nowrap px-6 py-4 ">{item.feedback_date.substring(0,10)}</td>
                                                <td class="whitespace-nowrap px-6 py-4" >{item.rate}</td>

                                            
                                            </tr>: <img className = "mx-auto w-1/2 mt-12"src="/images/nodata1.avif" alt=""/>
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

export default Feedbacks;