import React, { useState } from "react";
import { Link } from "react-router-dom";
import LandingImg from "../../assets/images/Landing2.jpg";
import LoginModal from "../../components/LoginModal/LoginModal";
import SignupModal from "../../components/SignupModal/SignupModal";
import "./landing.css";

export const Landing = ({ user, setUser, handleLogOut }) => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);

  return (
    <div className="landing">
      <div>
        <img className="Landing__img" src={LandingImg} alt="" />
      </div>
      <div className="">
        <div className="d-flex flex-column align-items-center justify-content-center">
          <h1 className="landing__title">FlyHead</h1>
          {user ? (
            <>
              <Link className="mt-2 landing__link" to="/map">
                Next Destination
              </Link>
              <Link className="mt-2 landing__link" to="/event">
                Current Event
              </Link>
              <Link className="mt-2 landing__link" to="/spending">
                Spending
              </Link>
              <Link className="mt-2 landing__link" to="" onClick={handleLogOut}>
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link
                to=""
                className="mt-2 landing__link"
                onClick={() => setLoginModalOpen(true)}
              >
                Login
              </Link>
              <LoginModal
                setUser={setUser}
                isOpen={loginModalOpen}
                onClose={() => setLoginModalOpen(false)}
              />
              <Link
                to=""
                className="mt-2 landing__link"
                onClick={() => setSignUpModalOpen(true)}
              >
                Signup
              </Link>
              <SignupModal
                setUser={setUser}
                isOpen={signUpModalOpen}
                onClose={() => setSignUpModalOpen(false)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
