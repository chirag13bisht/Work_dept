import React from 'react'
import { useState } from 'react'
const N = () => {
  const [update, setupdate] = useState(false)

  const updateButton=(btn)=>{
    setupdate(true)
    

  }
  return (
    <div>
      <button onClick={updateButton} id="btn">update</button>
      {update?<div><textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="message" rows="5" placeholder="Enter your Complaint" required ></textarea>
      <button>Submit
        </button></div>:""}
    </div>
  )
}

export default N