require("dotenv").config();
const { connectToDb } = require("./config/connection");
const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const parser = require("body-parser");
const authRouter = require("./router/Auth.router");
const messageRouter=require("./router/Message.router");
const userRouter= require("./router/Users.router")
const { app, server } = require("./socket/socket");
const path=require("path");
const __dir=path.resolve();
connectToDb();
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(session({ secret: "keyboard cat", cookie: { maxAge: 60000 } }));
app.use(express.json());
app.use(parser.urlencoded({ extended: true }));
app.use(cookieParser());
//
app.use("/api/", authRouter.router);
app.use("/api",messageRouter.router);
app.use("/api",userRouter.router);
app.use(express.static(path.join(__dir,"frontend/dist")));
app.get("*",(req,res)=>{
  res.sendFile(path.join(__dir,"frontend","dist","index.html"))
})
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`App is Running ${PORT}`);
});
