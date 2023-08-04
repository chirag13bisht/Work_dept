import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import Nav from '../Components/Nav';
import Delete from '../Components/Delete';
import Update from '../Components/Update';
import Assign from '../Components/Assign';
import Feedback from '../Components/Feedback';
import Complete from '../Components/Complete';
import Spinner from '../Components/Spinner'; // Import a spinner component for loading state

const Status = () => {
  const [complaint, setComplaint] = useState({});
  const [assigned, setAssigned] = useState(false);
  const [complete, setComplete] = useState(false);
  const [joindata, setJoinData] = useState({});
  const [role, setRole] = useState(false);
  const [assignData, setAssignData] = useState({});
  const [feedbackCheck, setFeedbackCheck] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  const params = useParams();
  const complaintId = params.complaint_id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [singleComplaintRes, tableJoinRes, userData] = await Promise.all([
          Axios.get(`http://localhost:3002/singlecomplaint_data/${complaintId}`),
          Axios.get(`http://localhost:3002/tablejoin/${complaintId}`),
          Axios.get('http://localhost:3002'),
        ]);

        setComplaint(singleComplaintRes.data[0]);
        setJoinData(tableJoinRes.data[0]);

        const userRole = userData.data[0].role;
        if(userRole==="General"){
          setRole(true)
        }
        else{
          setRole(false)
        }
      } catch (error) {
        // Handle error here (e.g., show an error message)
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Hide loading state
      }
    };

    fetchData();
  }, [complaintId]);

  useEffect(() => {
    setAssigned(complaint.state === 'assigned');
    setComplete(complaint.state === 'complete');
  }, [complaint.state]);

  useEffect(() => {
    const assignCheck = async () => {
      try {
        const assignCheckRes = await Axios.get(
          `http://localhost:3002/assignCheck/${complaintId}`
        );
        setAssignData(assignCheckRes.data[0]);
      } catch (error) {
        // Handle error here (e.g., show an error message)
        console.error('Error checking assignment:', error);
      }
    };

    assignCheck();
  }, [complaintId]);

  useEffect(() => {
    const feedbackData = async () => {
      try {
        const feedbackDataRes = await Axios.get(
          `http://localhost:3002/feedbackdata/${complaintId}`
        );
        setFeedbackCheck(feedbackDataRes.data.message === 'Nodata');
      } catch (error) {
        // Handle error here (e.g., show an error message)
        console.error('Error checking feedback:', error);
      }
    };

    feedbackData();
  }, [complaintId]);


  return (
    <div>
      <Nav />
      <div className='mt-5'>
        {loading ? (
          <Spinner /> // Show spinner while data is being fetched
        ) : (
          <div className=' mx-auto max-w-md sm:max-w-lg'>
            <div className=' shadow-2xl rounded bg-[#f5f5f5] px-8 pt-6 pb-8 mb-4 '>
              <div className='mb-10 text-center'>
                <h1 className='block text-gray-700 font-bold text-2xl'>
                  Complaint Status
                </h1>
              </div>
              <div className='divide-y-2'>
                <div>
                  <div className='flex justify-between mb-4'>
                    <label>Name</label>
                    <span>{joindata.name}</span>
                  </div>
                  <div className='flex justify-between mb-4'>
                    <label>Username</label>
                    <span>{complaint.username}</span>
                  </div>
                  <div className='flex justify-between mb-4'>
                    <label>Department</label>
                    <span>{joindata.department}</span>
                  </div>
                  <div className='flex justify-between mb-4'>
                    <label>Type of Complaint</label>
                    <span>{complaint.complaint_type}</span>
                  </div>
                  <div className='flex justify-between mb-4'>
                    <label>Complaint</label>
                    <span className='text-end'>{complaint.complaint.length > 30 ? (
                      <div>
                        {complaint.complaint.substr(0, 30)}
                        <br />
                        {complaint.complaint.substr(30, 90)}
                      </div>
                    ) : (
                      complaint.complaint
                    )}</span>
                  </div>
                </div>
                <div className=''>
                  <div className='pt-4 flex justify-between'>
                    <label>Status</label>
                    <span>{complaint.state}</span>
                  </div>
                  {assigned || complete ? (
                    <div className='pt-2 flex justify-between'>
                      <label>Assigned To</label>
                      <span>{assignData.assigned_to}</span>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className='mx-auto text-center mb-4'>
              <Delete />
            </div>
            <div className='mx-auto text-center mb-10 mt-10 '>
              {assigned && role !== 'General' ? <Complete /> : null}
            </div>
            <div className='mx-auto text-center mt-3'>
              {role ? <Update /> : <Assign />}
            </div>
            <div className='mx-auto text-center mb-4'>
              {complete && feedbackCheck ? <Feedback /> : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Status;