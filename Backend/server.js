// Imported required packages
const express = require("express"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  mongoose = require("mongoose");

// MongoDB Cluster URL
var mongoDatabase =
  "mongodb+srv://sayan1996:sayan1234@cluster0.mfbg1.mongodb.net/employeeDetails?retryWrites=true&w=majority";

// Created express server
const app = express();
mongoose.Promise = global.Promise;

// Connect MongoDB Database
mongoose
  .connect(mongoDatabase, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(
    () => {
      console.log("Database is connected");
    },
    (err) => {
      console.error(
        "There is a problem while connecting to the database " + err
      );
    }
  );

// All the express routes
const employeeRoutes = require("./Routes/Employee.route");

// Convert incoming data to JSON format
app.use(bodyParser.json());

// Enabled CORS
app.use(cors());

// Setup for the server port number
const port = process.env.PORT || 4000;

// Routes Configuration
app.use("/employees", employeeRoutes);

// Starting our express server
app.listen(port, () => {
  console.log("Server Listening On Port : " + port);
});
