import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import "../index.css";
import EmployeeService from "./Services";
const ListEmployee = () => {
  const { addToast } = useToasts();
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const employeeService = new EmployeeService();

  useEffect(() => {
    getEmployeeList();
  }, []);

  const getEmployeeList = async () => {
    try {
      const response = await axios.get("http://localhost:4000/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employee list:", error);
    }
  };

  const deleteEmployee = async (empid) => {
    try {
      await employeeService.deleteEmployee(empid);
      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee._id !== empid)
      );

      addToast("Employee deleted successfully!", {
        appearance: "success",
        hideProgressBar: true,
        autoDismiss: true,
      });
    } catch (error) {
      console.error("Failed to delete employee:", error);
    }
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter employees based on the search query
  const filteredEmployees = employees.filter((employee) => {
    const { firstName, lastName, email, phone } = employee;
    const searchLower = searchQuery.toLowerCase();
    return (
      firstName.toLowerCase().includes(searchLower) ||
      lastName.toLowerCase().includes(searchLower) ||
      email.toLowerCase().includes(searchLower) ||
      (phone ? phone.toString().includes(searchLower) : false)
    );
  });

  return (
    <div style={{ margin: "8% 8%" }}>
      <Form.Control
        type="text"
        placeholder="Search by First Name, Last Name, Email, or Phone"
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ marginBottom: "1rem", width: "30%" }}
      />
      <Table className="bordered-table" responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No records found
              </td>
            </tr>
          ) : (
            filteredEmployees.map((employee, i) => (
              <tr key={employee._id}>
                <td>{i + 1}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.phone}</td>
                <td>
                  <Link
                    to={`/editemployee/${employee._id}`}
                    className="btn btn-primary"
                  >
                    Edit
                  </Link>
                </td>
                <td>
                  <Button
                    onClick={() => deleteEmployee(employee._id)}
                    variant="danger"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default ListEmployee;
