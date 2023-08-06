import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Nav from '../Components/Nav';
import Axios from 'axios';

const WorkerRole = () => {
    const params = useParams();
    const worker_role = params.data;
    const [worker, setWorker] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Add isLoading state

    useEffect(() => {
        const workersData = async () => {
            try {
                const response = await Axios.get(
                    `http://localhost:3002/workers_data/${worker_role}`
                );
                setWorker(response.data);
                setIsLoading(false); // Set isLoading to false once data is fetched
            } catch (error) {
                console.log('Error fetching worker data:', error);
                setIsLoading(false); // Set isLoading to false even if there is an error
            }
        };
        workersData();
    }, [worker_role]);

    return (
        <div>
            <Nav />
            <div className="mb-10 mt-10 text-center">
                <h1 className="block text-gray-700 font-bold text-2xl">Workers Profile</h1>
            </div>
            {!isLoading ? (
                <div>
                    {worker.length > 0 ? (
                        <div className='mx-auto grid grid-cols-1 lg:grid-cols-2 my-8 gap-10'>
                            {worker.map((workerData) => (
                                <div key={workerData.worker_name} className='container mb-4 mx-auto max-w-sm '>
                                    <div className='container mt-12 bg-[#f5f5f5] shadow-2xl rounded px-8 pt-6 text-center pb-8  '>
                                        <div className='mb-2 '>
                                            <img className='w-20 border-4 rounded-full m-auto ' src='/Images/user-icon.jpg' alt='user' />
                                        </div>
                                        <div className='divide-y-2'>
                                            <div className='mb-5 text-center '>
                                                <h1 className='block text-gray-700 font-bold text-2xl'>{workerData.worker_name}</h1>
                                            </div>
                                            <div className=''>
                                                <div className='flex justify-between mb-2 mt-5'>
                                                    <span className='text-sm font-semibold'>Work Title</span>
                                                    <span className='text-sm font-semibold'>{workerData.worker_role}</span>
                                                </div>
                                                <div className='flex justify-between mb-2'>
                                                    <span className='text-sm font-semibold'>Complaints Assigned</span>
                                                    <span className='text-sm font-semibold'>{workerData.complaint_assigned}</span>
                                                </div>
                                                <div className='flex justify-between mb-5'>
                                                    <span className='text-sm font-semibold'>Complaints Completed</span>
                                                    <span className='text-sm font-semibold'>{workerData.complaint_completed}</span>
                                                </div>
                                                <div className='text-center mt-10'>
                                                   <Link to={`/worker_role/${worker_role}/${workerData.worker_name}`}> <button
                                                        className='bg-blue-500 py-2 px-4 border-2 rounded-md shadow-2xl text-white  transition ease-in-out delay-150  hover:scale-110 hover:bg-green-500 duration-300 ...' >
                                                        More Details
                                                    </button> </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="mx-auto w-1/2 mt-12">
                            <img src="/images/nodata1.avif" alt="" />
                        </div>
                    )}
                </div>
            ) : (
                <div className="text-center">Loading...</div>
            )}
        </div>
    );
};

export default WorkerRole;
