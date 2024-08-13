import axios from "axios";
import debounce from "lodash.debounce";
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

  const validate = (newFormData) => {
    let valid = true;
    const newErrors = {};

    if (!newFormData.firstName) {
      newErrors.firstName = "First name is required";
      valid = false;
    }
    if (!newFormData.lastName) {
      newErrors.lastName = "Last name is required";
      valid = false;
    }
    if (!newFormData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(newFormData.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }
    if (!newFormData.phone) {
      newErrors.phone = "Phone number is required";
      valid = false;
    } else if (!/^\d+$/.test(newFormData.phone)) {
      newErrors.phone = "Phone number is invalid";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedFormData = { ...formData, [name]: value };

    setFormData(updatedFormData);

    // Debounced validation
    debouncedValidate(updatedFormData);
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    const updatedFormData = { ...formData, [name]: value };

    validate(updatedFormData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate(formData)) {
      axios
        .post("http://localhost:4000/employees/addEmployee", formData)
        .then((response) => {
          if (response.status === 200) {
            addToast("Employee added successfully!", {
              appearance: "success",
              hideProgressBar: true,
              autoDismiss: true,
            });
            navigate("/");
          } else {
            addToast("Something went wrong!", {
              appearance: "error",
              hideProgressBar: true,
              autoDismiss: true,
            });
          }
        })
        .catch((error) => {
          addToast("Error occurred while adding employee.", {
            appearance: "error",
            hideProgressBar: true,
            autoDismiss: true,
          });
          console.log(error);
        });
    }
  };

  const debouncedValidate = debounce((formData) => {
    validate(formData);
  }, 300);

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
            onBlur={handleBlur}
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
            onBlur={handleBlur}
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
            onBlur={handleBlur}
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
            onBlur={handleBlur}
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
