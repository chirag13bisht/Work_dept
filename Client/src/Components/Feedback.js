import React, { useState } from 'react'
import Axios from 'axios'
import { useParams } from 'react-router-dom'

const Feedback = () => {
    const [feedbacks, setfeedbacks] = useState("")
    const [rate, setRate] = useState([])
    const params = useParams();
    const complaint_id = params.complaint_id

    const sumbitfeedback = async () => {
        await Axios.post(`http://localhost:3002/feedback/${complaint_id}`, { feedbacks: feedbacks,rate:rate })
            .then((res) => {
                if (res.data.message === "sumbited") {
                    window.alert("Feedback sumbited")
                    window.location.reload();
                }
                else {
                    window.alert("Feedback not sumbited")
                }
            })
    }
    return (
        <div>
            <div className='mb-4 mt-2 flex  justify-between '>
            <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Rate Service:</label>
            <div className="rating">
                <input type="radio" value="1" name="rating-2" onChange={(e) => {setRate(e.target.value)}} className="mask mask-star-2 bg-orange-400" />
                <input type="radio" value="2" name="rating-2" onChange={(e) => {setRate(e.target.value)}} className="mask mask-star-2 bg-orange-400" />
                <input type="radio" value="3" name="rating-2" onChange={(e) => {setRate(e.target.value)}} className="mask mask-star-2 bg-orange-400" />
                <input type="radio" value="4" name="rating-2" onChange={(e) => {setRate(e.target.value)}} className="mask mask-star-2 bg-orange-400" />
                <input type="radio" value="5" name="rating-2" onChange={(e) => {setRate(e.target.value)}} className="mask mask-star-2 bg-orange-400" />
            </div>
            </div>
            
            <div>
                <textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="message" rows="5" placeholder="Enter your Feedback" required onChange={(e) => {
                    setfeedbacks(e.target.value)
                }}></textarea>
                <div className='mt-4 mb-4'> <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-3" onClick={sumbitfeedback}>Submit
                </button >
                </div>
            </div>
        </div>
    )
}

export default Feedback