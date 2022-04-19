import { addNewTicketApi } from "../../api/ticket.api";
import {
  createNewTicketPending,
  createNewTicketSuccess,
  createNewTicketFail,
} from "./AddTicketSlice";

export const newTicket = (frmdata) => async (dispatch) => {
  dispatch(createNewTicketPending());

  try {
    console.log(frmdata)
    const result = await addNewTicketApi(frmdata);

    console.log(result);

    if (result.status === "error") {
      return dispatch(createNewTicketFail("New Ticket add fail"));
    }

    dispatch(createNewTicketSuccess(result.message));
  } catch (error) {
    dispatch(createNewTicketFail(error.message));
  }
};
