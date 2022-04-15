import React from 'react';
import Login from "./pages/login/login";
import './App.css';
import { Dashboard } from './pages/Dashboard/Dashboard'
import { AddTicket } from './pages/AddTicket/AddTicket.page';
import { TicketListing } from './pages/TicketList/ticketListing.page';
import { Ticket } from './pages/Ticket/Ticket.page';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
 
function App() {
    return (
        <div className="app">
            <Router>
                <Routes>
                    <Route exact path="/" element={<Login />} />
                    <Route element={<PrivateRoute/>}>
                        <Route exact path="/dashboard" element={<Dashboard/>}/>
                        <Route exact path="/add-ticket" element={<AddTicket/>}/>
                        <Route exact path="/tickets" element={<TicketListing/>}/>
                        <Route exact path="/ticket/:tid" element={<Ticket/>}/>
                    </Route>
                </Routes>
            </Router> 
        </div>
    )
}

export default App;

