import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Nav from '../Components/Nav';
import Spinner from '../Components/Spinner';

const Feedbacks = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState('ASC');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchFeedbackData = async () => {
      setLoading(true);
      try {
        const res = await Axios.get('http://localhost:3002/feedbackjoin');
        setData(res.data);
      } catch (error) {
        console.error('Error fetching feedback data:', error);
        window.alert('An error occurred while fetching feedback data');
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbackData();
  }, []);

  const sorting = (col) => {
    if (order === 'ASC') {
      const sorted = [...data].sort((a, b) => (a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1));
      setData(sorted);
      setOrder('DSC');
    }
    if (order === 'DSC') {
      const sorted = [...data].sort((a, b) => (a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1));
      setData(sorted);
      setOrder('ASC');
    }
  };

  

  return (
    <div>
      <Nav />
      <div className="flex overflow-hidden bg-[#f5f5f5] shadow-2xl m-10 flex-col">
        <div className="mb-10 mt-10 text-center">
          <h1 className="block text-gray-700 font-bold text-2xl">User's Feedback</h1>
        </div>
        <div className="flex justify-center">
          <input
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            type="text"
            id="default-input"
            className="bg-gray-50 border border-gray-300 text-center justify-between items-center text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-11/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder='Search "Status or complaint id or complaint type"'
          />
        </div>
        <div className="overflow-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr className="text-center">
                    <th>
                      <button className="px-4 py-4 " onClick={() => sorting('complaint_id')}>
                        Complaint Id
                      </button>
                    </th>
                    <th>
                      <button className="px-6 py-4 " onClick={() => sorting('username')}>
                      Complaint
                      </button>
                    </th>
                    <th>
                      <button className="px-6 py-4 " onClick={() => sorting('complaint')}>
                        Assigned To
                      </button>
                    </th>
                    <th>
                      <button className="px-6 py-4 " onClick={() => sorting('feedback')}>
                        Feedback
                      </button>
                    </th>
                    <th>
                      <button className="px-6 py-4 " onClick={() => sorting('feedback_date')}>
                        Feedback date
                      </button>
                    </th>
                    <th>
                      <button className="px-6 py-4 " onClick={() => sorting('rate')}>
                        Feedback Rating
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    // Show a spinner while loading
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        <div className="spinner"><Spinner/></div>
                      </td>
                    </tr>
                  ) : data.length === 0 ? (
                    // Show 'No Data' message when data is empty
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        <img className="mx-auto w-1/2 mt-12" src="/images/nodata1.avif" alt="" />
                      </td>
                    </tr>
                  ) : (
                    // Render the table rows when data is available
                    data
                      .filter((item) => {
                        return (
                          search.toLowerCase() === '' ||
                          item.assigned_to.toLowerCase().includes(search) ||
                          item.feedbacks.toLowerCase().includes(search) ||
                          item.complaint_id.toLowerCase().includes(search) ||
                          item.complaint.toLowerCase().includes(search) ||
                          item.feedback_date.toLowerCase().includes(search) ||
                          item.rate.toLowerCase().includes(search)
                        );
                      })
                      .map((item) => (
                        <tr className="border-b dark:border-neutral-500 text-center" key={item.complaint_id}>
                          <td className="whitespace-nowrap px-6 py-4 transition ease-in-out ">{item.complaint_id}</td>
                          <td className="whitespace-nowrap px-6 py-4 transition ease-in-out ">{item.complaint}</td>
                          <td className="whitespace-nowrap px-6 py-4 transition ease-in-out ">{item.assigned_to}</td>
                          <td className="whitespace-nowrap px-6 py-4 transition ease-in-out ">{item.feedbacks}</td>
                          <td className="whitespace-nowrap px-6 py-4 transition ease-in-out  ">{item.feedback_date.substring(0, 10)}</td>
                          <td className="whitespace-nowrap px-6 py-4 transition ease-in-out delay-150  hover:scale-110 duration-300"><div className="rating flex justify-center">
                            {Array.from({ length: 5 }, (_, index) => (
                              <svg
                                key={index}
                                xmlns="http://www.w3.org/2000/svg"
                                fill={index + 1 <= item.rate ? '#ffac00' : '#B7B8BC'}
                                className="h-6 w-6"
                                viewBox="0 0 24 24"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                stroke=""
                              >
                                <path d="M12 2l3.09 6.09L22 9.29l-4.55 4.41L18 22l-6-5-6 5 1.55-8.3L2 9.3l6.91-1.21L12 2z"></path>
                              </svg>
                            ))}
                          </div></td>
                        </tr>
                      ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedbacks;
