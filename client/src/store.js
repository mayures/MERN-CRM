import { configureStore } from "@reduxjs/toolkit";

import ticketsReducer from "./pages/TicketList/ticketSlice";
import loginReducer from "./components/login/loginSlice";
import userReducer from "./pages/Dashboard/userSlice";
import newTicketReducer from './components/AddTicket/AddTicketSlice';

const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
    login: loginReducer,
    user: userReducer,
    newTicket : newTicketReducer
  },
});

export default store;