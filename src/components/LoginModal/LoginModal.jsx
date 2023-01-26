import React, { useState } from "react";
import Modal from "react-modal";

//User Service
import { login } from "../../utilities/service/user";

//Modal Styles
const customStyles = {
  content: {
    top: "40%",
    borderRadius: "1rem",
    padding: "2rem 1rem",
  },
};

const LoginModal = ({ isOpen, onClose, setUser }) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  //Capture User Credentials
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  //User Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await login(credentials);
    setUser(user);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            name="email"
            className="form-control"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="mt-2 btn btn-blue">
          LOG IN
        </button>
      </form>
    </Modal>
  );
};

export default LoginModal;
