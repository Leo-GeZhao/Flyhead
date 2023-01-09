import React, { useState } from "react";
import { signUp } from "../../utilities/service/user";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "40%",
    borderRadius: "1rem",
    padding: "2rem 1rem",
  },
};

const defaultState = {
  name: "",
  email: "",
  password: "",
  confirm: "",
};

const SignupModal = ({ isOpen, onClose, setUser }) => {
  const [formData, setFormData] = useState(defaultState);

  const { name, email, password, confirm } = formData;
  const onSubmit = async (event) => {
    event.preventDefault();
    const { name, password, email } = formData;
    const data = { name, password, email };

    const user = await signUp(data);
    console.log(user);
    setUser(user);
    onClose();
  };

  function handleChange(evt) {
    const newFormData = {
      ...formData,
      [evt.target.name]: evt.target.value,
    };
    setFormData(newFormData);
  }

  const disabled =
    password !== confirm || !name || !email || !password || !confirm;
  return (
    <div className="">
      <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
        <form onSubmit={onSubmit} className="form" autoComplete="off">
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

          <button className="" type="submit" disabled={disabled}>
            Sign up
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default SignupModal;
