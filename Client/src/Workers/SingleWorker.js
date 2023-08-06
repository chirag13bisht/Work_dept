import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Nav from '../Components/Nav';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import Spinner from '../Components/Spinner';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const labels = ["5", "4", "3", "2", "1"];

const chartOptions = {
  indexAxis: 'y', // Set the indexAxis option to 'y' for horizontal bar chart
  scales: {
    y: {
      grid: {
        display: false, // Remove background lines (grid) on the y-axis
      },
    },
    x: {
      grid: {
        display: false, // Remove background lines (grid) on the x-axis
      },
    },
  },
};

const SingleWorker = () => {
  const params = useParams();
  const worker_name = params.worker_name;
  const [workerjoin, setWorkerjoin] = useState([]);
  const [singledata, setSingleData] = useState([]);
  const [feedbackdata, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const singleworkerdata = async () => {
      try {
        const [workerjoinres, workerres, feedbackres] = await Promise.all([
          Axios.get(`http://localhost:3002/singleworkerdatajoin/${worker_name}`),
          Axios.get(`http://localhost:3002/singleworkerdata/${worker_name}`),
          Axios.get(`http://localhost:3002/singleworkerfeedback/${worker_name}`),
        ]);
        setWorkerjoin(workerjoinres.data);
        setSingleData(workerres.data);
        setFeedbackData(feedbackres.data);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching worker data:', error);
        setLoading(false);
      }
    };
    singleworkerdata();
  }, [worker_name]);

  const feedbackCounts = feedbackdata.reduce((acc, feedback) => {
    const { rate } = feedback;
    if (acc[rate]) {
      acc[rate] += 1;
    } else {
      acc[rate] = 1;
    }
    return acc;
  }, {});

  // Map feedback counts into data array
  const feedbackDataArray = labels.map((label) => feedbackCounts[label] || 0);

  const horizontalData = {
    labels: labels,
    datasets: [{
      axis: 'y',
      label: 'No of Feedbacks',
      data: feedbackDataArray,
      backgroundColor: [
        '#ffac00',
        '#ffac00',
        '#ffac00',
        '#ffac00',
        '#ffac00',
      ],
      borderWidth: 0,
      borderRadius: 10,
      barThickness: 10,
    }],
  };

  // Calculate feedback counts for each rating

  // Calculate average rate
  let totalFeedbacks = 0;
  let totalRateSum = 0;
  Object.entries(feedbackCounts).forEach(([rating, count]) => {
    totalFeedbacks += count;
    totalRateSum += count * parseInt(rating);
  });
  const averageRate = totalFeedbacks !== 0 ? totalRateSum / totalFeedbacks : 0;

  return (
    <>
      <Nav />
      {loading ? ( // Conditionally render the Spinner when loading is true
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row divide-x-2">
          {singledata.map((singleWorker) => (
            <div className="w-full lg:w-1/3" key={singleWorker.worker_name}>
              <div className="mb-2 mt-10">
                <img className="w-1/3 border-4 rounded-full m-auto" src="/Images/user-icon.jpg" alt="user" />
              </div>
              <div className="mb-5 text-center">
                <h1 className="block text-gray-700 font-bold text-4xl">{worker_name}</h1>
              </div>
              <div className="divide-y-2">
                <div className="mx-5 mt-10 mb-10">
                  <div className="flex justify-between mb-2">
                    <span className="text-lg font-semibold">Complaints Assigned</span>
                    <span className="text-lg font-semibold">{singleWorker.complaint_assigned}</span>
                  </div>
                  <div className="flex justify-between mb-5">
                    <span className="text-lg font-semibold">Complaints Completed</span>
                    <span className="text-lg font-semibold">{singleWorker.complaint_completed}</span>
                  </div>
                </div>
                <div className="mt-10">
                  <div className="mb-5 mt-10 text-center">
                    <h1 className="block text-gray-700 font-bold text-2xl">Feedbacks Rating</h1>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="ml-2 text-gray-700 font-bold text-4xl mb-5">{averageRate.toFixed(2)}</div>
                    <div className="flex">
                      {Array.from({ length: 5 }, (_, index) => (
                        <svg
                          key={index}
                          xmlns="http://www.w3.org/2000/svg"
                          fill={index + 1 <= averageRate ? '#ffac00' : '#B7B8BC'}
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          stroke=""
                        >
                          <path d="M12 2l3.09 6.09L22 9.29l-4.55 4.41L18 22l-6-5-6 5 1.55-8.3L2 9.3l6.91-1.21L12 2z" />
                        </svg>
                      ))}
                    </div>
                    <div className=" text-gray-700 font-bold text-xs mb-5">{`${totalFeedbacks}  Feedbacks`}</div>
                  </div>
                  <div className="mx-auto mt-10 mb-10" style={{ width: '80%', height: '200px' }}>
                    <Bar data={horizontalData} options={chartOptions} />
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="w-full lg:w-2/3">
            <div className="mb-10 mt-10 text-center">
              <h1 className="block text-gray-700 font-bold mx-auto text-2xl">Ayush Work Status </h1>
            </div>
            <div className="overflow-x-auto px-4">
              <div className="inline-block min-w-full overflow-x-auto">
                <div className="overflow-hidden">
                  <div className="w-full max-w-screen-lg mx-auto">
                    <table className="w-full text-left text-sm font-light">
                      <thead className="border-b font-medium dark:border-neutral-500">
                        <tr className="text-center">
                          <th><button className="px-4 py-4">Complaint Id</button></th>
                          <th><button className="px-6 py-4">Assigned By</button></th>
                          <th><button className="px-6 py-4">Assigned Date</button></th>
                          <th><button className="px-6 py-4">Status</button></th>
                        </tr>
                      </thead>
                      <tbody>
                        {workerjoin.length === 0 ? (
                          <tr className="border-b dark:border-neutral-500 text-center">
                            <td colSpan="4">
                              <img className="w-1/2 mx-auto" src="/Images/nodata1.avif" alt="No Data" />
                              <p className="text-gray-500 mt-3">No data available</p>
                            </td>
                          </tr>
                        ) : (
                          workerjoin.map((workerData) => (
                            <tr className="border-b dark:border-neutral-500 text-center" key={workerData.complaint_id}>
                              <td className="whitespace-nowrap px-6 py-4">{workerData.complaint_id}</td>
                              <td className="whitespace-nowrap px-6 py-4">{workerData.username}</td>
                              <td className="whitespace-nowrap px-6 py-4">{workerData.assigned_date.substring(0, 10)}</td>
                              <td className="whitespace-nowrap px-6 py-4">{workerData.state}</td>
                              <td className="whitespace-nowrap px-6 py-4"> <Link to={`/Status/${workerData.complaint_id}`}><button className="bg-blue-500 py-2 px-3 border-2 rounded-md shadow-2xl text-white  transition ease-in-out delay-150  hover:scale-110 hover:bg-green-500 duration-300 ...">Check</button></Link></td>
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
        </div>
      )}
    </>
  );
};

export default SingleWorker;
