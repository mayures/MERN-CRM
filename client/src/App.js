import React from 'react';
import Login from "./pages/login/login";
import './App.css';
import { DefaultLayout } from './layouts/DefaultLayout';
import { Dashboard } from './pages/Dashboard/Dashboard'
import { AddTicket } from './pages/AddTicket/AddTicket.page';
import { TicketListing } from './pages/TicketList/ticketListing.page';
import { Ticket } from './pages/Ticket/Ticket.page';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <div className="app">
            <Router>
                <Routes>
                    <Route exact path="/" element={<Login />} />
                    <Route exact path="/dashboard" element={<DefaultLayout><Dashboard /></DefaultLayout>} />
                    <Route exact path="/add-ticket" element={<DefaultLayout><AddTicket /></DefaultLayout>} />
                    <Route exact path="/tickets" element={<DefaultLayout><TicketListing /></DefaultLayout>} />
                    <Route exact path="/ticket/:tid" element={<DefaultLayout><Ticket /></DefaultLayout>} />
                </Routes>
            </Router>
        </div>
    )
}

export default App;

