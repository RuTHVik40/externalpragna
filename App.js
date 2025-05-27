import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({ name: "", email: "", teamName: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const { name, email, teamName } = formData;
    if (!name || !email || !teamName) {
      alert("All fields are required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Invalid email format");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await axios.post("http://localhost:5000/register", formData);
        alert("Registration Successful");
        setFormData({ name: "", email: "", teamName: "" });
      } catch (err) {
        alert("Registration Failed");
      }
    }
  };

  return (
    <div className="container">
      <header className="my-4">
        <h1>Hackathon Registration</h1>
      </header>
      <nav className="navbar navbar-expand navbar-light bg-light mb-4">
        <a className="navbar-brand" href="#">Home</a>
        <a className="nav-link" href="#">About</a>
        <a className="nav-link" href="#">Team Registration</a>
      </nav>
      <form onSubmit={handleSubmit} className="p-4 border rounded">
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Team Name</label>
          <input type="text" name="teamName" className="form-control" value={formData.teamName} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Submit</button>
      </form>
    </div>
  );
}

export default App;
