const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const logger = require("./logger");
const userRouter = require("./routers/users");
const diaryRouter = require("./routers/diaries");

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(logger);

app.use("/users", userRouter);
app.use("/diaries", diaryRouter);

module.exports = app;