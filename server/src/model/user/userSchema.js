const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  company: {
    type: String,
    required: true,
    maxlength: 50,
  },
  address: {
    type: String,
    maxlength: 10,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 100,
  },
  refreshJWT: {
    token: {
      type: String,
      maxlength: 500,
      default: "",
    },
    addedAt: {
      type: Date,
      requireD: true,
      default: Date.now(),
    },
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
