import {
  fetchSingleTicketFail,
  fetchSingleTicketLoading,
  fetchSingleTicketSuccess,
  fetchTicketFail,
  fetchTicketLoading,
  fetchTicketSuccess,
  replyTicketFail,
  replyTicketLoading,
  replyTicketSuccess,
  searchTickets,
  closeTicketLoading,
  closeTicketSuccess,
  closeTicketFail,
} from "./ticketSlice";
import {
  getAllTickets,
  getSingleTicket,
  updateTicket,
  closeTicketApi,
} from "../../api/ticket.api";


//Get all tickets
export const fetchAllTickets = () => async (dispatch) => {
  dispatch(fetchTicketLoading());

  try {
    const result = await getAllTickets();

    console.log(result);

    dispatch(fetchTicketSuccess(result.data));
  } catch (error) {
    dispatch(fetchTicketFail(error.message));
  }
};

//Filter Search Tickets
export const filterSearchTicket = (str) => (dispatch) => {
  dispatch(searchTickets(str));
};

//Get Single Ticket
export const fetchSingleTicket = (_id) => async (dispatch) => {
  dispatch(fetchSingleTicketLoading());

  try {
    const result = await getSingleTicket(_id);

    console.log(result);

    dispatch(fetchSingleTicketSuccess(result.data));
  } catch (error) {
    dispatch(fetchSingleTicketFail(error.message));
  }
};

export const replyTicket = (_id, msgObj) => async (dispatch) => {
  dispatch(replyTicketLoading());

  try {
    const result = await updateTicket(_id, msgObj);

    console.log(result);

    if (result.status === "error") {
      return dispatch(replyTicketFail(result.message));
    }
    dispatch(fetchSingleTicket(_id));
    dispatch(replyTicketSuccess(result.message));
  } catch (error) {
    dispatch(replyTicketFail(error.message));
  }
};

export const closeTicketAction = (_id) => async (dispatch) => {
  dispatch(closeTicketLoading());
  
  try {
    const result = await closeTicketApi(_id);

    if(result.status==="error"){
      return dispatch(closeTicketFail(result.message))
    }
    dispatch(fetchSingleTicket(_id));
    dispatch(closeTicketSuccess(result.message));

  } catch (error) {
    dispatch(closeTicketFail(error));
  }
};
