import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'
import { DefaultLayout } from '../../layouts/DefaultLayout';
import { Dashboard } from '../../pages/Dashboard/Dashboard';

const isAuth = true;
export const PrivateRoute = () => {    
    return (      
        isAuth ? <DefaultLayout><Outlet/></DefaultLayout> : <Navigate to="/" />
    );
};
