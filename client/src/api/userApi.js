import axios from "axios";
const rootUrl = "http://localhost:3000/v1/";
const userProfileUrl = rootUrl + "user/";
const loginUrl = rootUrl + "user/login";
const logoutUrl = rootUrl + "user/logout";
const newAccessJWTUrl = rootUrl + "tokens";

export const userLogin = (frmData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(loginUrl, frmData);

      resolve(res.data);
      console.log(res.data);

      if (res.data.status === "success") {
        sessionStorage.setItem("accessJWT", res.data.accessToken);

        localStorage.setItem(
          "crmSite",
          JSON.stringify({ refreshJWT: res.data.refreshToken })
        );
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessJWT = sessionStorage.getItem("accessJWT");

      if (!accessJWT) {
        reject("token not found");
      }

      const res = await axios.get(userProfileUrl, {
        headers: {
          Authorisation: accessJWT,
        },
      });

      resolve(res.data);
    } catch (error) {
      reject(error.message);
    }
  });
};

export const fetchNewAccessJWT = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { refreshJWT } = JSON.parse(localStorage.getItem("accessJWT"));

      if (!refreshJWT) {
        reject("token not found");
      }

      const res = await axios.get(newAccessJWTUrl, {
        headers: {
          Authorisation: refreshJWT,
        },
      });

      if (res.data.status === "success") {
        sessionStorage.setItem("accessJWT", res.data.accessToken);
      }
      resolve(true);
    } catch (error) {
      if (error.message === "forbidden") {
        localStorage.removeItem("crmSite");
      }
      reject(false);
    }
  });
};

export const userlogOut = async () => {
  try {
    const accessJWT = sessionStorage.getItem("accessJWT");
    await axios.delete(logoutUrl, {
      headers: {
        Authorisation: accessJWT,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
