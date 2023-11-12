const express = require("express");
const path = require("path");
const app = express();
const userRouter = require("./routes/userRoutes");
const viewRouter = require("./routes/viewRoutes");
const tokenRouter = require("./routes/tokenRoutes")
const cookieParser = require('cookie-parser')

app.use(cookieParser());
app.use(express.json());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tokens", tokenRouter);
app.use(express.static(path.join(__dirname, "views")));
app.use("/", viewRouter);

module.exports = app;
