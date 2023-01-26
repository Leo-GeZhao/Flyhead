import React, { useState } from "react";
import Modal from "react-modal";

//User Service
import { signUp } from "../../utilities/service/user";

//Modal Styles
const customStyles = {
  content: {
    top: "40%",
    borderRadius: "1rem",
    padding: "2rem 1rem",
  },
};

//Form Default State
const defaultState = {
  name: "",
  email: "",
  password: "",
  confirm: "",
};

const SignupModal = ({ isOpen, onClose, setUser }) => {
  const [formData, setFormData] = useState(defaultState);
  const { name, email, password, confirm } = formData;

  //Capture SignUp Credentials
  const handleChange = (e) => {
    const newFormData = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(newFormData);
  };

  //User SignUp
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, password, email } = formData;
    const data = { name, password, email };
    const user = await signUp(data);
    setUser(user);
    onClose();
  };

  //SignUp Validations
  const disabled =
    password !== confirm || !name || !email || !password || !confirm;

  return (
    <div className="">
      <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
        <form onSubmit={handleSubmit} className="form" autoComplete="off">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="form-control"
              value={name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              className="form-control"
              value={email}
              onChange={handleChange}
              required
            />
            <small id="emailHelp" class="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
              value={password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm">Confirm Password</label>
            <input
              type="password"
              name="confirm"
              id="confirm"
              className="form-control"
              value={confirm}
              onChange={handleChange}
              required
            />
          </div>

          <button
            className="mt-2 btn btn-blue"
            type="submit"
            disabled={disabled}
          >
            Sign up
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default SignupModal;
