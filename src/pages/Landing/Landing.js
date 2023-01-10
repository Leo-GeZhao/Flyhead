import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import LandingImg from "../../assets/images/Landing2.jpg";
import LoginModal from "../../components/LoginModal/LoginModal";
import SignupModal from "../../components/SignupModal/SignupModal";
import jwt_decode from "jwt-decode";
import { googleSignIn } from "../../utilities/service/user";
import "./landing.css";

export const Landing = ({
  user,
  setUser,
  handleLogOut,
  showGoogleSignIn,
  setShowGoogleSignIn,
}) => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);

  async function handleCallBackRes(res) {
    const userObj = jwt_decode(res.credential);
    const { name, email } = userObj;
    const data = { name, email };
    const user = await googleSignIn(data);
    setUser(user);
  }

  useEffect(() => {
    if (showGoogleSignIn) {
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleCallBackRes,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        {
          theme: "outline",
          size: "large",
        }
      );
    }
  }, [showGoogleSignIn]);

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
              <div
                id="signInDiv"
                className="mt-2"
                onClick={() => setShowGoogleSignIn(false)}
              ></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
