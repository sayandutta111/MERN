// Imported required packages
const express = require("express"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  mongoose = require("mongoose"),
  dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// MongoDB Cluster URL
const mongoDatabase = process.env.DATABASEURI;

// Ensure the database URI is defined
if (!mongoDatabase) {
  console.error("DATABASEURI is not defined in the environment variables.");
  process.exit(1);
}

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
        "There is a problem while connecting to the database: " + err
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

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Starting our express server
app.listen(port, () => {
  console.log("Server Listening On Port : " + port);
});
