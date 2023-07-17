import React from 'react'
import Nav from '../Components/Nav'

const Summary = () => {
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
                                        <th scope="col" class="px-6 py-4">S.No</th>
                                        <th scope="col" class="px-6 py-4">Username</th>
                                        <th scope="col" class="px-6 py-4">Department</th>
                                        <th scope="col" class="px-6 py-4">Complaint Type</th>
                                        <th scope="col" class="px-6 py-4">Complaint</th>
                                        <th scope="col" class="px-6 py-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="border-b dark:border-neutral-500 text-center">
                                        <td class="whitespace-nowrap px-6 py-4 font-medium">1</td>
                                        <td class="whitespace-nowrap px-6 py-4">Rahul</td>
                                        <td class="whitespace-nowrap px-6 py-4">AI</td>
                                        <td class="whitespace-nowrap px-6 py-4">Electrical</td>
                                        <td class="whitespace-nowrap px-6 py-4">Fan not working</td>
                                        <td class="whitespace-nowrap px-6 py-4">Pending</td>
                                    </tr>
                                    <tr class="border-b dark:border-neutral-500 text-center">
                                        <td class="whitespace-nowrap px-6 py-4 font-medium">2</td>
                                        <td class="whitespace-nowrap px-6 py-4">Jacob</td>
                                        <td class="whitespace-nowrap px-6 py-4">LAN</td>
                                        <td class="whitespace-nowrap px-6 py-4">Civil</td>
                                        <td class="whitespace-nowrap px-6 py-4">System not working</td>
                                        <td class="whitespace-nowrap px-6 py-4">Completed</td>

                                    </tr>
                                    <tr class="border-b dark:border-neutral-500 text-center">
                                        <td class="whitespace-nowrap px-6 py-4 font-medium">3</td>
                                        <td class="whitespace-nowrap px-6 py-4">Larry</td>
                                        <td class="whitespace-nowrap px-6 py-4">Chemistry</td>
                                        <td class="whitespace-nowrap px-6 py-4">Electrical</td>
                                        <td class="whitespace-nowrap px-6 py-4">AC not Working</td>
                                        <td class="whitespace-nowrap px-6 py-4">Completed</td>
                                    </tr>
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