import { fetchTicketFail, fetchTicketLoading, fetchTicketSuccess, searchTickets } from "./ticketSlice"
import { getAllTickets } from "../../api/ticket.api"

export const fetchAllTickets = () => async (dispatch) => {
    dispatch(fetchTicketLoading())

    try {
        const result = await getAllTickets()

        console.log(result)

        dispatch(fetchTicketSuccess(result.data))
    } catch (error) {
        dispatch(fetchTicketFail(error.message))
    }

}

export const filterSearchTicket = (str) => (dispatch) => {
    dispatch(searchTickets(str))
}