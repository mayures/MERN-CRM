import axios from "axios";

const rootUrl = "http://localhost:3000/v1/";
const getAllTicketUrl = rootUrl + "tickets/";
const getSingleTicketUrl = rootUrl + "tickets/";
//const replyTicketUrl = rootUrl + "tickets/";
const closeTicketUrl = rootUrl + "tickets/close-ticket/";
const addNewTicketUrl = rootUrl + "tickets/";

export const getAllTickets = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get(getAllTicketUrl, {
        headers: {
          Authorisation: sessionStorage.getItem("accessJWT"),
        },
      });
      console.log(result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export const getSingleTicket = (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get(getSingleTicketUrl + _id, {
        headers: {
          Authorisation: sessionStorage.getItem("accessJWT"),
        },
      });
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export const updateTicket = (_id, msgObj) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.put(getSingleTicketUrl + _id, msgObj, {
        headers: {
          Authorisation: sessionStorage.getItem("accessJWT"),
        },
      });
      resolve(result.data);
    } catch (error) {
      reject(error);
    }
  });
};

export const closeTicketApi = (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.patch(
        closeTicketUrl + _id,
        {},
        {
          headers: {
            Authorisation: sessionStorage.getItem("accessJWT"),
          },
        }
      );

      resolve(result.data);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

export const addNewTicketApi = (frmdata) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(frmdata);
      const result = await axios.post(addNewTicketUrl, frmdata, {
        headers: {
          Authorisation: sessionStorage.getItem("accessJWT"),
        },
      });

      resolve(result.data);
    } catch (error) {
      reject(error);
    }
  });
};
