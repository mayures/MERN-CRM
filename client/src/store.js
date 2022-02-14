import { configureStore } from "@reduxjs/toolkit";
import ticketsReducer from "./pages/TicketList/ticketSlice"

const store = configureStore({
    reducer: {
        tickets: ticketsReducer
    }
})

export default store