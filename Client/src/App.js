import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './Login/Login'
import Signup from './Signup/Signup'
import Main from './Main/Main'
import Status from './Status/Status'
import Summary from './Summary/Summary'
import Profile from './Profile/Profile'
import Example from './Components/N'
import Feedbacks from './Feedbacks/Feedbacks'

const App = () => {
  
  
  return (
    <>
      <Router>
     
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/Signup' element={<Signup />}></Route>
          <Route path='/Main' element={<Main />}></Route>
          <Route path='/Status/:complaint_id' element={<Status />}></Route>
          <Route path='/Summary' element={<Summary />}></Route>
          <Route path='/Profile' element={<Profile />}></Route>
          <Route path='/Feedbacks' element={<Feedbacks />}></Route> 
          <Route path='/N' element={<Example />}></Route>
        </Routes>
      

      </Router>
    </>
  )
}

export default App