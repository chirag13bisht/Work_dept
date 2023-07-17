import React from 'react'
import Nav from '../Components/Nav'
const Status = () => {
    return (
        <div>
            <Nav />
            <div className='mt-5'>
                <div className=' mx-auto max-w-lg'>
                    <div class="bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4 ">
                        <div className='mb-10 text-center'>
                            <h1 className='block text-gray-700 font-bold text-xl'>
                                Complaint Status
                            </h1>
                        </div>
                        <div  className='divide-y-2'>
                            <div>
                                <div className='flex justify-between mb-4'>
                                    <label>Name</label>

                                    <span>Rahul</span>
                                </div>
                                <div className='flex justify-between mb-4'>
                                    <label>Username</label>

                                    <span>Rahul</span>
                                </div>
                                <div className='flex justify-between mb-4'>
                                    <label>Department</label>

                                    <span>AI</span>
                                </div>
                                <div className='flex justify-between mb-4'>
                                    <label>Type of Complaint</label>

                                    <span>Electrical</span>
                                </div>
                                <div className='flex justify-between mb-4'>
                                    <label>Complaint</label>

                                    <span>Fan not working</span>
                                </div>
                            </div>
                            <div className='pt-4 flex justify-between'>
                                <label>Status</label>
                                <span>Pending</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div></div>
    )
}

export default Status