const express = require("express");
const User = require("../model/user/userSchema");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { setJWT, deleteJWT } = require("../../helpers/redis.helper");
const userAuthorisation = require("../../middleware/auth.middleware");
const {
  getUserByEmail,
  updatePassword,
  emptyUserRefreshJWT,
} = require("../model/user/userModel");
const {
  setPasswordResetPin,
  getPinbyEmailPin,
  deletePin,
} = require("../model/resetPin.js/ResetPin.model");
const { emailProcessor } = require("../../helpers/email.helper");
const hashPassword = require("../../helpers/bcrypt.helper");
const {
  resetPassValid,
  updatePassValid,
} = require("../../middleware/formValidation.helper");
const saltRounds = 10;

router.post("/", async (req, res) => {
  const { name, company, address, phone, email, password } = req.body;

  if (!email || !password || !phone || !company || !name) {
    return res.json({ status: "fail", message: "fill the complete form" });
  }

  const existUser = await User.findOne({ email });
  if (existUser) {
    return res.json({ status: "fail", message: "email already exists" });
  }

  const passwordHash = await bcrypt.hashSync(password, saltRounds);
  const user = new User({
    name,
    company,
    address,
    phone,
    email,
    password: passwordHash,
  });

  await user
    .save()
    .then((user) => {
      res.json({ message: "new user created", user });
    })
    .catch((err) => {
      console.log(err);
      res.json({ status: "fail", message: err.message });
    });
});

router.get("/", userAuthorisation, async (req, res) => {
  const _id = req.userId;

  const userProf = await User.findById({ _id });
  const { name, email } = userProf;

  res.json({
    user: {
      _id,
      name,
      email,
    },
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      status: "fail",
      message: "please provide email and the password",
    });
  }

  const existUser = await User.findOne({ email });
  if (!existUser) {
    return res.json({
      status: "fail",
      message: "plaease provide the valid email",
    });
  }

  const passwordCorrect = await bcrypt.compareSync(
    password,
    existUser.password
  );
  if (!passwordCorrect) {
    return res.json({
      status: "fail",
      message: "email or password inocorrect",
    });
  }

  const accessToken = await jwt.sign(
    {
      user: existUser._id,
    },
    process.env.jwt_access_token,
    {
      expiresIn: "1d",
    }
  );

  await setJWT(accessToken, existUser._id);

  const refreshToken = await jwt.sign(
    {
      user: existUser._id,
    },
    process.env.jwt_refresh_token,
    {
      expiresIn: "30d",
    }
  );

  await User.findOneAndUpdate(
    { _id: existUser._id },
    {
      $set: {
        "refreshJWT.token": refreshToken,
        "refreshJWT.addedAt": Date.now(),
      },
    },
    { new: true }
  )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.error(err));

  console.log(accessToken);
  console.log(refreshToken);

  res.json({
    status: "success",
    message: "Login Successfully!",
    accessToken,
    refreshToken,
  });
});

router.post("/reset-password", resetPassValid, async (req, res) => {
  const { email } = req.body;

  const user = await getUserByEmail(email);

  if (user && user._id) {
    const setPin = await setPasswordResetPin(email);
    await emailProcessor({
      type: "request-new-password",
      email,
      pin: setPin.pin,
    });

    return res.json({
      status: "success",
      message:
        "If the email exists in our database a reset pin will be sent to you shortly.",
    });
  }

  return res.json({
    status: "error",
    message:
      "If the email exists in our database a reset pin will be sent to you shortly.",
  });
});

router.patch("/reset-password", updatePassValid, async (req, res) => {
  const { email, pin, newPassword } = req.body;
  const getPin = await getPinbyEmailPin(email, pin);
  if (getPin._id) {
    const dbDate = getPin.addedAt;
    const expiresIn = 1;
    let expDate = dbDate.setDate(dbDate.getDate() + expiresIn);
    const today = Date.now();

    if (today > expDate) {
      return res.json({ status: "error", message: "invalid or expired pin" });
    }

    const hash = await hashPassword(newPassword);
    console.log(hash);
    const updatedpass = await updatePassword(email, hash);
    console.log(updatedpass);
    if (updatedpass && updatedpass._id) {
      await emailProcessor({ type: "password-update-success", email });
      await deletePin(email);
      return res.json({ status: "success", updatedpass });
    }
  }
});

router.delete("/logout", userAuthorisation, async (req, res) => {
  const { authorisation } = req.headers;

  const _id = req.userId;

  deleteJWT(authorisation);
  const data = await emptyUserRefreshJWT(_id, "");
  
  if (data && data._id) {
    return res.json({ status: "success", message: "logged out successfully" });
  }

  return res.json({
    status: "error",
    message: "unable to logout please try again later",
  });
});

module.exports = router;
