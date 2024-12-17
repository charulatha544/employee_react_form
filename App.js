import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    employeeId: "",
    email: "",
    phoneNumber: "",
    department: "",
    dateOfJoining: new Date(),
    role: "",
  });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const departments = ["HR", "Engineering", "Marketing"];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.employeeId || formData.employeeId.length > 10)
      newErrors.employeeId =
        "Employee ID is required and must be max 10 characters.";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email is required.";
    if (!formData.phoneNumber || !/^[0-9]{10}$/.test(formData.phoneNumber))
      newErrors.phoneNumber = "Valid 10-digit phone number is required.";
    if (!formData.department) newErrors.department = "Department is required.";
    if (!formData.role) newErrors.role = "Role is required.";
    if (!formData.dateOfJoining || new Date(formData.dateOfJoining) > new Date())
      newErrors.dateOfJoining = "Date of joining must be in the past.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post("http://localhost:5000/api/employees", {
        ...formData,
        dateOfJoining: formData.dateOfJoining.toISOString().split("T")[0],
      });
      setMessage(response.data.message);
      setFormData({
        name: "",
        employeeId: "",
        email: "",
        phoneNumber: "",
        department: "",
        dateOfJoining: new Date(),
        role: "",
      });
    } catch (error) {
      console.log(error.response || error.message || "Unknown error occurred");
      setMessage(error.response?.data?.error || "Submission failed.");
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      employeeId: "",
      email: "",
      phoneNumber: "",
      department: "",
      dateOfJoining: new Date(),
      role: "",
    });
    setErrors({});
    setMessage("");
  };

  return (
    <div className="App">
      <h1>Add Employee</h1>
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />
          {errors.name && <span>{errors.name}</span>}
        </div>

        {/* Employee ID Field */}
        <div>
          <label>Employee ID:</label>
          <input
            type="text"
            value={formData.employeeId}
            onChange={(e) =>
              setFormData({ ...formData, employeeId: e.target.value })
            }
          />
          {errors.employeeId && <span>{errors.employeeId}</span>}
        </div>

        {/* Email Field */}
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {errors.email && <span>{errors.email}</span>}
        </div>

        {/* Phone Number Field */}
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            value={formData.phoneNumber}
            onChange={(e) =>
              setFormData({ ...formData, phoneNumber: e.target.value })
            }
          />
          {errors.phoneNumber && <span>{errors.phoneNumber}</span>}
        </div>

        {/* Department Dropdown */}
        <div>
          <label>Department:</label>
          <select
            value={formData.department}
            onChange={(e) =>
              setFormData({ ...formData, department: e.target.value })
            }
          >
            <option value="">Select Department</option>
            {departments.map((dep) => (
              <option key={dep} value={dep}>
                {dep}
              </option>
            ))}
          </select>
          {errors.department && <span>{errors.department}</span>}
        </div>

        {/* Date Picker */}
        <div>
          <label>Date of Joining:</label>
          <DatePicker
            selected={formData.dateOfJoining}
            onChange={(date) =>
              setFormData({ ...formData, dateOfJoining: date })
            }
          />
          {errors.dateOfJoining && <span>{errors.dateOfJoining}</span>}
        </div>

        {/* Role Field */}
        <div>
          <label>Role:</label>
          <input
            type="text"
            value={formData.role}
            onChange={(e) =>
              setFormData({ ...formData, role: e.target.value })
            }
          />
          {errors.role && <span>{errors.role}</span>}
        </div>

        {/* Buttons */}
        <button type="submit">Submit</button>
        <button type="reset" onClick={handleReset}>
          Reset
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default App;
