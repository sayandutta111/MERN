import axios from "axios";

class EmployeeService {
  deleteEmployee(id) {
    return axios
      .delete(`http://localhost:4000/employees/deleteEmployee/${id}`)
      .then(() => {
        console.log("Employee Deleted Successfully");
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
        throw error; // Rethrow the error to handle it in the calling code
      });
  }
}

export default EmployeeService;
