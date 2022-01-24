import React from 'react';
import Login from "./pages/login/login";
import './App.css';
import { DefaultLayout } from './layouts/DefaultLayout';
import {Dashboard} from './pages/Dashboard/Dashboard'

function App () {
    return (
        <div className="app">
            {/* <Login /> */}
            <DefaultLayout>
                <Dashboard />
            </DefaultLayout>
        </div> 
    ) 
}

export default App;

