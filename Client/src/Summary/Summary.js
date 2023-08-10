import React from 'react'
import Nav from '../Components/Nav'
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Spinner from '../Components/Spinner';






const Summary = () => {

    const [data, setdata] = useState([])
    const [loading, setLoading] = useState(true);
    const [order, setorder] = useState("ASC");
    const [alldata, setalldata] = useState([])
    const [role, setrole] = useState("")
    const [search, setSearch] = useState('');

    useEffect(() => {
        const complaintdata = async () => {
            try {
                const response = await Axios.get('http://localhost:3002/complaint_data');
                setdata(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); 
            }
        };
        complaintdata();
    }, []);


    useEffect(() => {
        const allcomplaintdata = async () => {
            try {
                const response = await Axios.get('http://localhost:3002/allcomplaint_data');
                setalldata(response.data);
            } catch (error) {
                console.error('Error fetching all data:', error);
            } finally {
                setLoading(false)
            }
        };
        allcomplaintdata();
    }, []);

    Axios.defaults.withCredentials = true;


    useEffect(() => {
        const userdata = async () => {
            try {
                const response = await Axios.get('http://localhost:3002')
                setrole(response.data[0].role)
            } catch (error) {
                console.error('Error fetching role:', error);
            }
        };
        userdata();
    }, []);


    const sorting = (col) => {
        if (order === "ASC") {
            const sorted = [...data].sort((a, b) =>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1);
            setdata(sorted);
            setorder("DSC")
        }
        if (order === "DSC") {
            const sorted = [...data].sort((a, b) =>
                a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1);
            setdata(sorted);
            setorder("ASC")
        }
    }

    const [allorder, setallorder] = useState("ASC");
    const allsorting = (col) => {
        if (allorder === "ASC") {
            const sorted = [...alldata].sort((a, b) =>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1);
            setalldata(sorted);
            setallorder("DSC")
        }
        if (allorder === "DSC") {
            const sorted = [...alldata].sort((a, b) =>
                a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1);
            setalldata(sorted);
            setallorder("ASC")
        }
    }

    const customSort = (a, b) => {
        const statusOrder = {
            pending: 1,
            assigned: 2,
            complete: 3,
        };
    
        return statusOrder[a.state] - statusOrder[b.state];
    };
 
   

    if (role === "General") {
        return (


            <div>
                <Nav />
                <div className="flex overflow-hidden shadow-2xl bg-[#f5f5f5] m-10 flex-col">
                    <div className='mb-10 mt-10 text-center'>
                        <h1 className='block text-gray-700 font-bold text-2xl'>Summary of Complaints</h1>
                    </div>
                    <div className='flex justify-center '>
                        <input onChange={(e) => setSearch(e.target.value.toLowerCase())}
                            type="text" id="default-input" className="bg-gray-50 border border-gray-300 mb-3 text-center justify-between items-center text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-11/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
      dark:focus:ring-blue-500 dark:focus:border-blue-500 " placeholder="Search....." /></div>
                    {loading ? <Spinner /> :
                        <div className="overflow-x-auto  sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                    <table className="min-w-full text-left text-sm font-light ">
                                        <thead className="border-b font-medium dark:border-neutral-500">
                                            <tr className='text-center'>
                                                <th><button className="px-4 py-4 " onClick={() => sorting("complaint_id")}>Complaint Id</button></th>
                                                <th><button className="px-6 py-4  " onClick={() => sorting("username")}>Username</button></th>
                                                <th> <button className="px-6 py-4 " onClick={() => sorting("complaint_type")}>Complaint Type</button></th>
                                                <th> <button className="px-6 py-4 " onClick={() => sorting("complaint")}>Complaint</button></th>
                                                <th> <button className="px-6 py-4 " onClick={() => sorting("state")}>Status</button></th>
                                            </tr>
                                        </thead>
                                        <tbody>{data.filter((item) => {
                                            return search.toLowerCase() === ''
                                                ? item
                                                : (item.username.toLowerCase().includes(search)
                                                    || item.complaint_type.toLowerCase().includes(search)
                                                    || item.complaint_id.toLowerCase().includes(search)
                                                    || item.state.toLowerCase().includes(search)
                                                    || item.complaint.toLowerCase().includes(search));;
                                        }).sort((a, b) => {
                                            if (a.state === 'pending' && b.state !== 'pending') {
                                                return -1;
                                            }
                                            if (a.state !== 'pending' && b.state === 'pending') {
                                                return 1;
                                            }
                                            return customSort(a, b);})
                                        .map((item) => {
                                            return (
                                                <tr className="border-b dark:border-neutral-500 text-center" key={item.complaint_id}>
                                                    <td className="whitespace-nowrap px-6 py-4 font-sans" >{item.complaint_id}</td>
                                                    <td className="whitespace-nowrap px-6 py-4" >{item.username}</td>
                                                    <td className="whitespace-nowrap px-6 py-4" >{item.complaint_type}</td>
                                                    <td className="whitespace-nowrap px-6 py-4" > {item.complaint.length > 30 ? (
                                                        <div>
                                                            {item.complaint.substr(0, 30)}
                                                            <br />
                                                            {item.complaint.substr(30, 90)}
                                                        </div>
                                                    ) : (
                                                        item.complaint
                                                    )}</td>
                                                    <td className={`border-b dark:border-neutral-500 text-center font-bold ${item.state === 'pending' ? 'text-red-700' : item.state === 'assigned' ? 'text-yellow-700' : item.state === 'complete' ? 'text-green-700' : ''}`}>{item.state}</td>
                                                    <td className="whitespace-nowrap px-6 py-4">  <Link to={`/Status/${item.complaint_id}`}><button className="bg-blue-500 py-2 px-3 border-2 rounded-md shadow-2xl text-white  transition ease-in-out delay-150  hover:scale-110 hover:bg-green-500 duration-300 ...">Check</button> </Link></td>
                                                </tr>
                                            )
                                        })}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>}
                </div>

            </div>
        )

    }
    else {
        return (
            <div className=''>
                <Nav />
                <div className="flex overflow-hidden bg-[#f5f5f5] shadow-2xl m-10 flex-col">
                    <div></div>
                    <div className='mb-10 mt-10 text-center '>
                        <h1 className='block text-gray-700 font-bold mx-auto text-2xl'>Summary of Complaints</h1>
                    </div>
                    <div className='flex justify-center'>
                        <input onChange={(e) => setSearch(e.target.value.toLowerCase())}
                            type="text" id="default-input" className="bg-gray-50 border border-gray-300 mb-3 text-center justify-between items-center text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-11/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
      dark:focus:ring-blue-500 dark:focus:border-blue-500 " placeholder='Search "username or complaint id or complaint type"' /></div>
                    {loading ? <Spinner /> :
                        <div className="overflow-x-auto  sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                    <table className="min-w-full text-left text-sm font-light">
                                        <thead className="border-b font-medium dark:border-neutral-500">
                                            <tr className='text-center '>
                                                <th><button className="px-4 py-4 " onClick={() => allsorting("complaint_id")}>Complaint Id</button></th>
                                                <th><button className="px-6 py-4  " onClick={() => allsorting("username")}>Username</button></th>
                                                <th> <button className="px-6 py-4 " onClick={() => allsorting("complaint_type")}>Complaint Type</button></th>
                                                <th> <button className="px-6 py-4 " onClick={() => allsorting("complaint")}>Complaint</button></th>
                                                <th> <button className="px-6 py-4 " onClick={() => allsorting("state")}>Status</button></th>
                                            </tr>
                                        </thead>
                                        <tbody>{alldata.filter((item) => {
                                            return search.toLowerCase() === ''
                                                ? item
                                                : (item.username.toLowerCase().includes(search)
                                                    || item.complaint_type.toLowerCase().includes(search)
                                                    || item.complaint_id.toLowerCase().includes(search)
                                                    || item.state.toLowerCase().includes(search)
                                                    || item.complaint.toLowerCase().includes(search));
                                        }).sort((a, b) => {
                                            if (a.state === 'pending' && b.state !== 'pending') {
                                                return -1;
                                            }
                                            if (a.state !== 'pending' && b.state === 'pending') {
                                                return 1;
                                            }
                                            return customSort(a, b);})
                                            .map((item) => {  
                                            return (
                                                <tr className="border-b dark:border-neutral-500 text-center " key={item.complaint_id}>
                                                    <td className="whitespace-nowrap px-6 py-4" >{item.complaint_id}</td>
                                                    <td className="whitespace-nowrap px-6 py-4" >{item.username}</td>
                                                    <td className="whitespace-nowrap px-6 py-4" >{item.complaint_type}</td>
                                                    <td className="whitespace-nowrap px-6 py-4 " >{item.complaint.length > 30 ? (
                                                        <div>
                                                            {item.complaint.substr(0, 30)}
                                                            <br />
                                                            {item.complaint.substr(30, 90)}
                                                        </div>
                                                    ) : (
                                                        item.complaint
                                                    )}</td>
                                                    <td className={`border-b dark:border-neutral-500 text-center font-bold ${item.state === 'pending' ? 'text-red-700' : item.state === 'assigned' ? 'text-yellow-700' : item.state === 'complete' ? 'text-green-700' : ''}`}>{item.state}</td>
                                                     <td className="whitespace-nowrap px-6 py-4"> <Link to={`/Status/${item.complaint_id}`}><button className="bg-blue-500 py-2 px-3 border-2 rounded-md shadow-2xl text-white  transition ease-in-out delay-150  hover:scale-110 hover:bg-green-500 duration-300 ...">Check</button></Link></td> 
                                                </tr>
                                            )
                                        })}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>}
                </div>

            </div>
        )
    }


}

export default Summary