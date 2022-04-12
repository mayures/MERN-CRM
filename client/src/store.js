import { configureStore } from "@reduxjs/toolkit";

import ticketsReducer from "./pages/TicketList/ticketSlice";
import loginReducer from "./components/login/loginSlice";
import userReducer from "./pages/Dashboard/userSlice";

const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
    login: loginReducer,
    user: userReducer,
  },
});

export default store;