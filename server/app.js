const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`app listening on Port: ${PORT}`);
});

mongoose.connect(process.env.mongo_url);

if (process.env.NODE_ENV !== "production") {
  const db = mongoose.connection;

  db.on("open", () => {
    console.log("connected to mongodb");
  });
  db.on("error", (error) => {
    console.log(error);
  });

  app.use(morgan("tiny"));
}

//API Secuirity
app.use(helmet());

//handle cors
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/v1/user", require("./src/routers/user"));
app.use("/v1/tickets", require("./src/routers/ticket"));
app.use("/v1/tokens", require("./src/routers/token"));

const handleError = require("./src/utils/errorHandler");

app.use((req, res, next) => {
  const error = new Error("resource not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  handleError(error, res);
});
