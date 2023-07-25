import React from 'react'
import Nav from '../Components/Nav'
import { useState,useEffect } from 'react';
import Axios  from 'axios';
import { Link } from 'react-router-dom';

const Summary = () => {

    Axios.defaults.withCredentials = true;
    const [data, setdata] = useState([ ])
    useEffect(() => {
        Axios.get('http://localhost:3002/complaint_data')
        .then((res) =>{
            console.log(res.data.length)
            setdata(res.data)
        } ) 
        },[]);
    return (
        

        <div>
            <Nav />
            <div class="flex  shadow-2xl m-10 flex-col">
                <div className='mb-10 text-center'>
                    <h1 className='block text-gray-700 font-bold text-2xl'>Summary of Complaints</h1>
                </div>
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div class="overflow-hidden">
                            <table class="min-w-full text-left text-sm font-light">
                                <thead class="border-b font-medium dark:border-neutral-500">
                                    <tr className='text-center'>
                                        <th scope="col" class="px-6 py-4">Complaint Id</th>
                                        <th scope="col" class="px-6 py-4">Username</th>
                                        <th scope="col" class="px-6 py-4">Complaint Type</th>
                                        <th scope="col" class="px-6 py-4">Complaint</th>
                                        <th scope="col" class="px-6 py-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody>{data.map((item)=>
                                    <tr class="border-b dark:border-neutral-500 text-center">
                                       <td class="whitespace-nowrap px-6 py-4" >{item.complaint_id}</td> 
                                        <td class="whitespace-nowrap px-6 py-4" >{item.username}</td>
                                        <td class="whitespace-nowrap px-6 py-4">{item.complaint_type}</td>
                                        <td class="whitespace-nowrap px-6 py-4">{item.complaint}</td>
                                        <td class="whitespace-nowrap px-6 py-4">{item.state}</td>
                                        <Link to={`/Status/${item.complaint_id}`}>  <td class="whitespace-nowrap px-6 py-4"><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Check</button></td> </Link>
                                    </tr>)}
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Summary