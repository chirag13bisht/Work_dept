import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import Main from './Main/Main';
import Status from './Status/Status';
import Summary from './Summary/Summary';
import Profile from './Profile/Profile';

import Feedbacks from './Feedbacks/Feedbacks';
import ErrorPage from './Error/ErrorPage';
import Unauthorized from './Components/Unauthorized'
import RequireAuth from './Components/RequireAuth';
import WorkerMain from './Workers/WorkerMain';
import WorkerRole from './Workers/WorkerRole';
import SingleWorker from './Workers/SingleWorker';

const App = () => {
  const ROLES = {
    'User':"General",
    'Admin':"ADMIN"
  }


  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Unauthorized" element={<Unauthorized />} />

        
        <Route element={<RequireAuth allowedRoles={[ROLES.User,ROLES.Admin]}/>}>
        <Route path="/main" element={<Main />} />
        <Route path="/status/:complaint_id" element={<Status />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/profile" element={<Profile />} />
        
       
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]}/>}>
        <Route path="/feedbacks" element={<Feedbacks />} />
        <Route path="/workers" element={<WorkerMain />} />
        <Route path="/worker_role/:data" element={<WorkerRole />} />
        <Route path="/worker_role/:data/:worker_name" element={<SingleWorker />} />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>

    </>
  );
};

export default App;
