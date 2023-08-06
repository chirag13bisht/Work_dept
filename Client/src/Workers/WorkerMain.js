import React from 'react'
import Nav from '../Components/Nav'
import { Link } from 'react-router-dom'

const WorkerMain = () => {
  const data ={
    "Electrical" : "Electrical",
    "Civil" : "Civil",
    "Option3" : "Option3",
    "Option4" : "Option4"

  }
  return (
    <>
      <Nav />
      <div className='mt-20'>
      <div className="mb-10 mt-10 text-center">
          <h1 className="block text-gray-700 font-bold text-2xl">Select Workers Role</h1>
        </div>
      <div className='mx-auto grid grid-cols-1 lg:grid-cols-2 my-8 gap-10'>
        {Object.keys(data).map((key) => (
       <div key={key} className="container mb-4 mx-auto  max-w-xs ">
            <Link to={`/worker_role/${data[key]}`}>
   <div className="container mt-12 bg-[#f5f5f5] shadow-2xl h-60 rounded px-8 pt-6 text-center pb-8 transition ease-in-out delay-150  hover:scale-110 duration-300 flex items-center justify-center">            
              <h1 className='text-2xl'>{data[key]}</h1>
            </div> </Link>
          </div> 
        ))}
      </div>
      </div>
    </>
  )
}

export default WorkerMain