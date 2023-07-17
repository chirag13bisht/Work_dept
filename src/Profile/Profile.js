import React from 'react'
import Nav from '../Components/Nav'

const Profile = () => {
    return (
        <div>
            <Nav />
            <div className='mt-5'>
                <div className=' mx-auto max-w-lg'>
                    <div class="bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4 ">
                        
                        <div className='mb-2 '>
                            <img className='w-20 border-4 rounded-full m-auto' src='/Images/user-icon.jpg' alt='user' />
                        </div>
                        <div className='mb-10 text-center'>
                            <h1 className='block text-gray-700 font-bold text-2xl'>User Profile</h1>
                        </div>
                        <div className=''>
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
                                    <label>No of Complaint</label>

                                    <span>4</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className=' text-center'>
                <button className='bg-blue-500 py-2 px-3 border-2 rounded-md shadow-2xl text-white hover:text-black'>Log Out</button>
            </div>
        </div>
    )
}

export default Profile