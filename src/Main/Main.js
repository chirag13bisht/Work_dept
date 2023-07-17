import React from 'react'
import Nav from '../Components/Nav'

const Main = () => {

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
                        </div>
                    </div>
                </div>

                <div className='w-1/2 float-right'>

                    <div class="max-w-md mx-auto">
                        <form class="bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4">
                            <div className='mb-10 text-center'>
                                <h1 className='block text-gray-700 font-bold text-xl'>Enter Your Complaint</h1>
                            </div>
                            <div class="mb-4 flex  justify-between">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Type of Complaint :</label>
                                <select className='px-10' id="cars" placeholder='select'>
                                    <option value="volvo">Electrical</option>
                                    <option value="saab">Civil</option>
                                    <option value="opel">option3</option>
                                    <option value="audi">Option 4</option>
                                </select>
                            </div>
                            <div class="mb-6">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="message">Complaint</label>
                                <textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="message" rows="5" placeholder="Enter your Complaint" required></textarea>
                            </div>
                            <div class="flex items-center justify-center">
                                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
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