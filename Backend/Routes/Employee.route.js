// Importing important packages
const express = require("express");

// Using express and routes
const app = express();
const employeeRoute = express.Router();

// Employee model which is required and imported
let employeeModel = require("../Model/Employee");

// To Get List Of Employees
employeeRoute.route("/").get(async (req, res) => {
  try {
    const employees = await employeeModel.find(); // No callback needed
    res.json(employees);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching employees" });
  }
});

// To Add New Employee
employeeRoute.route("/addEmployee").post(async (req, res) => {
  try {
    let employee = new employeeModel(req.body);
    await employee.save();
    res.status(200).json({ employee: "Employee Added Successfully" });
  } catch (err) {
    res.status(400).send("Something Went Wrong");
  }
});

// To Get Employee Details By Employee ID
employeeRoute.route("/editEmployee/:id").get(async (req, res) => {
  try {
    const employee = await employeeModel.findById(req.params.id); // No callback needed
    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error fetching employee" });
  }
});

// To Update The Employee Details
employeeRoute.route("/updateEmployee/:id").post(async (req, res) => {
  try {
    const employee = await employeeModel.findById(req.params.id); // No callback needed
    if (!employee) {
      return res
        .status(404)
        .json({ message: "Unable To Find Employee With This Id" });
    } else {
      employee.firstName = req.body.firstName;
      employee.lastName = req.body.lastName;
      employee.email = req.body.email;
      employee.phone = req.body.phone;

      await employee.save();
      res.json("Employee Updated Successfully");
    }
  } catch (err) {
    res.status(400).send("Unable To Update Employee");
  }
});

// To Delete The Employee
employeeRoute.route("/deleteEmployee/:id").delete(async (req, res) => {
  try {
    const result = await employeeModel.findByIdAndDelete(req.params.id); // Use findByIdAndDelete
    if (result) {
      res.json({ message: "Employee Deleted Successfully" });
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error deleting employee", error: err });
  }
});

module.exports = employeeRoute;
