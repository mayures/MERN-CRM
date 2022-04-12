import axios from "axios";

export const getAllTickets = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get("http://localhost:3000/v1/ticket", {
        headers: {
          Authorisation:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjI1NDY2MmRlMTMwMDQ4ZDM2NWI3Yzk4IiwiaWF0IjoxNjQ5NzQwODkzLCJleHAiOjE2NTIzMzI4OTN9.0ND-DfCgCISxW-eFi_ct6hI6UYJBEaAI32jnuwk5WfE",
        },
      });
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
