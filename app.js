const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");

// const authRouter = require("./routes/auth");
app.use(express.json());
app.use(cors());
dotenv.config({ path: "./.env" });
require("./db/db");
// app.use(
//   cors({
//     origin: "*",
//   })
// );

app.use(require("./routes/user_router"));
const PORT = process.env.PORT;

//middlewares

const server = () => {
  app.listen(PORT, () => {
    console.log(`listening to the port ${PORT}`);
  });
};
server();
