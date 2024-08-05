import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
const customStyle = {
  width: "300px",
  margin: "0 auto",
};

const AddEmployee = () => {
  const { addToast } = useToasts();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();

  const validate = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
      valid = false;
    }
    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
      valid = false;
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
      valid = false;
    } else if (!/^\d+$/.test(formData.phone)) {
      newErrors.phone = "Phone number is invalid";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      axios
        .post("http://localhost:4000/employees/addEmployee", formData)
        .then((response) => {
          if (response.status === 200) {
            addToast("Employee added successfully!", {
              appearance: "success",
              hideProgressBar: true,
              autoDismiss: true,
            });
          } else {
            addToast("Something went wrong!", {
              appearance: "error",
              hideProgressBar: true,
              autoDismiss: true,
            });
          }
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="container">
      <form style={customStyle} onSubmit={handleSubmit}>
        <label>
          First Name
          <input
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            className="form-control"
          />
          {errors.firstName && (
            <div className="text-danger">{errors.firstName}</div>
          )}
        </label>
        <br />
        <label>
          Last Name
          <input
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            className="form-control"
          />
          {errors.lastName && (
            <div className="text-danger">{errors.lastName}</div>
          )}
        </label>
        <br />
        <label>
          Email
          <input
            name="email"
            type="text"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
          />
          {errors.email && <div className="text-danger">{errors.email}</div>}
        </label>
        <br />
        <label>
          Phone No
          <input
            name="phone"
            type="text"
            value={formData.phone}
            onChange={handleChange}
            className="form-control"
          />
          {errors.phone && <div className="text-danger">{errors.phone}</div>}
        </label>
        <br />
        <input type="submit" value="Submit" className="btn btn-primary" />
      </form>
    </div>
  );
};

export default AddEmployee;
