import React from 'react'
import { useLocation,Navigate,Outlet } from 'react-router-dom'
import useAuth from './useAuth'

const RequireAuth = ({allowedRoles}) => {
    const {auth} =useAuth();
    const location = useLocation(); 
     return (
    auth.role?.find(role => allowedRoles?.includes(role)) ? 
    <Outlet/>
    : auth?.username
    ? <Navigate to ='/Unauthorized' state={{from: location}} replace />
    : <Navigate to ='/' state={{from: location}} replace />
  );
}

export default RequireAuth