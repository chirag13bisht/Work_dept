import React, { useState } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState('');
  const [rate, setRate] = useState([]);
  const [loading, setLoading] = useState(false); // New state to track loading
  const params = useParams();
  const complaint_id = params.complaint_id;

  const submitFeedback = async () => {
    setLoading(true);
    try {
      const res = await Axios.post(`http://localhost:3002/feedback/${complaint_id}`, {
        feedbacks: feedbacks,
        rate: rate,
      });
      if (res.data.message === 'sumbited') {
        window.alert('Feedback submitted');
        window.location.reload();
      } else {
        window.alert('Feedback not submitted');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      window.alert('An error occurred while submitting feedback');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='shadow-2xl rounded px-8 pt-6 pb-8 mb-4 bg-[#f5f5f5]'>
       <div className='mb-10 text-center mt-2'>
                <h1 className='block text-gray-700 font-bold text-xl'>
                  How Was the Service ?
                </h1>
              </div>
      <div className="mb-4 mt-2 flex  justify-between ">
        <label className="block text-gray-700 text-sm font-bold mb-2" for="email">
          Rate Service:
        </label>
        <div className="rating">
          <input
            type="radio"
            value="1"
            name="rating-2"
            onChange={(e) => {
              setRate(e.target.value);
            }}
            className="mask mask-star-2 bg-orange-400"
          />
          <input
            type="radio"
            value="2"
            name="rating-2"
            onChange={(e) => {
              setRate(e.target.value);
            }}
            className="mask mask-star-2 bg-orange-400"
          />
          <input
            type="radio"
            value="3"
            name="rating-2"
            onChange={(e) => {
              setRate(e.target.value);
            }}
            className="mask mask-star-2 bg-orange-400"
          />
          <input
            type="radio"
            value="4"
            name="rating-2"
            onChange={(e) => {
              setRate(e.target.value);
            }}
            className="mask mask-star-2 bg-orange-400"
          />
          <input
            type="radio"
            value="5"
            name="rating-2"
            onChange={(e) => {
              setRate(e.target.value);
            }}
            className="mask mask-star-2 bg-orange-400"
          />
        </div>
      </div>

      <div>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="message"
          rows="5"
          placeholder="Enter your Feedback"
          required
          onChange={(e) => {
            setFeedbacks(e.target.value);
          }}
        ></textarea>
        <div className="mt-4 mb-4">
          <button
            className="bg-blue-500 py-2 px-4 border-2 rounded-md shadow-2xl text-white  transition ease-in-out delay-150  hover:scale-110 hover:bg-green-500 duration-300 ..."
            onClick={submitFeedback}
            disabled={loading} // Disable the button while loading
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
          {/* You can also add a spinner while loading */}
          {loading && <div className="spinner"></div>}
        </div>
      </div>
    </div>
  );
};

export default Feedback;
