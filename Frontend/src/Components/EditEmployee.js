import axios from "axios";
import debounce from "lodash.debounce";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

const customStyle = {
  width: "300px",
  margin: "0 auto",
};

const EditEmployee = () => {
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

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getEmployeeById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/employees/editEmployee/${id}`
        );
        setFormData({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          phone: response.data.phone,
        });
      } catch (error) {
        console.error(error);
        addToast("Failed to load employee details.", {
          appearance: "error",
          hideProgressBar: true,
          autoDismiss: true,
        });
      }
    };

    getEmployeeById();
  }, [id, addToast]);

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

  // Debounced validation
  const debouncedValidate = debounce((formData) => {
    validate(formData);
  }, 300);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Debounced validation
    debouncedValidate({ ...formData, [name]: value });
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    validate({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      try {
        await axios.post(
          `http://localhost:4000/employees/updateEmployee/${id}`,
          formData
        );
        addToast("Employee updated successfully!", {
          appearance: "success",
          hideProgressBar: true,
          autoDismiss: true,
        });
        navigate("/");
      } catch (error) {
        console.error(error);
        addToast("Failed to update employee.", {
          appearance: "error",
          hideProgressBar: true,
          autoDismiss: true,
        });
      }
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

export default EditEmployee;
