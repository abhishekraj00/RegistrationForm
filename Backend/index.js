const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 8000;

//database configuration
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connect"))
  .catch(() => console.log("database connection"));

// middleware
app.use(express.json());

app.use("/", require("./routes/registerData"));

app.listen(port, () => {
  console.log("Server listening on port 8080");
});
