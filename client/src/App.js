import React from 'react';
import Login from "./pages/login/login";
import './App.css';
import { DefaultLayout } from './layouts/DefaultLayout';
import {Dashboard} from './pages/Dashboard/Dashboard'
import { AddTicket } from './pages/AddTicket/AddTicket.page';
import { TicketListing } from './pages/TicketList/ticketListing.page';
import { Ticket } from './pages/Ticket/Ticket.page';

function App () {
    return (
        <div className="app">
            {/* <Login /> */}
            <DefaultLayout>
                {/* <Dashboard /> */}
                {/* <AddTicket/> */}
                {/* <TicketListing /> */}
                <Ticket/>
            </DefaultLayout>
        </div> 
    ) 
}

export default App;

