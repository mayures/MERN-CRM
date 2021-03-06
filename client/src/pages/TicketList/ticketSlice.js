import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tickets: [],
  isLoading: false,
  error: "",
  searchTicketList: [],
  selectedTicket: {},
  replyMsg: "",
  replyTicketError:""
};

const ticketListSlice = createSlice({
  name: "ticketList",
  initialState,
  reducers: {
    fetchTicketLoading: (state) => {
      state.isLoading = true;
    },
    fetchTicketSuccess: (state, action) => {
      state.isLoading = false;
      state.searchTicketList = action.payload;
      state.tickets = action.payload;
    },
    fetchTicketFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    searchTickets: (state, action) => {
      state.searchTicketList = state.tickets.filter((row) => {
        if (!action.payload) return row;
        return row.subject.toLowerCase().includes(action.payload.toLowerCase());
      });
    },
    fetchSingleTicketLoading: (state) => {
      state.isLoading = true;
    },
    fetchSingleTicketSuccess: (state, action) => {
      state.isLoading = false;
      state.selectedTicket = action.payload;
      state.error = "";
    },
    fetchSingleTicketFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    replyTicketLoading: (state) => {
      state.isLoading = true;
    },
    replyTicketSuccess: (state, action) => {
      state.isLoading = false;
      state.error = "";
      state.replyMsg = action.payload;
    },
    replyTicketFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    closeTicketLoading: (state) => {
      state.isLoading = true;
    },
    closeTicketSuccess: (state, action) => {
      state.isLoading = false;
      state.error = "";
      state.replyMsg = action.payload;
    },
    closeTicketFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    resetResponseMsg : (state, action)=>{
      state.isLoading = false;
      state.replyTicketError = "";
      state.replyMsg = "";
    }
  },
});

const { reducer, actions } = ticketListSlice;

export const {
  fetchTicketLoading,
  fetchTicketSuccess,
  fetchTicketFail,
  searchTickets,
  fetchSingleTicketLoading,
  fetchSingleTicketSuccess,
  fetchSingleTicketFail,
  replyTicketLoading,
  replyTicketSuccess,
  replyTicketFail,
  closeTicketLoading,
  closeTicketSuccess,
  closeTicketFail,
  resetResponseMsg
} = actions;

export default reducer;
