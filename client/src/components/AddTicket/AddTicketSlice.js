import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: "",
  successMsg: "",
};

const addTicketSlice = createSlice({
  name: "newTicket",
  initialState,
  reducers: {
    createNewTicketPending: (state) => {
      state.isLoading = true;
    },
    createNewTicketSuccess: (state, action) => {
      state.isLoading = false;
      state.successMsg = action.payload;
      state.error = "";
    },
    createNewTicketFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    resetSuccessMsg: (state) => {
      state.isLoading = false;
      state.successMsg = "";
    },
  },
});

const { reducer, actions } = addTicketSlice;

export const {
  createNewTicketPending,
  createNewTicketSuccess,
  createNewTicketFail,
  resetSuccessMsg,
} = actions;

export default reducer;
