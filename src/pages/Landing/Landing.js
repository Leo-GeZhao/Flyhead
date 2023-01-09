import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import LandingImg from "../../assets/images/Landing2.jpg";
import LoginModal from "../../components/LoginModal/LoginModal";
import SignupModal from "../../components/SignupModal/SignupModal";
import jwt_decode from "jwt-decode";
import { googleSignIn } from "../../utilities/service/user";
import "./landing.css";

export const Landing = ({ user, setUser, handleLogOut }) => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);

  const divRef = useRef(null);
  console.log(divRef);

  async function handleCallBackRes(res) {
    const userObj = jwt_decode(res.credential);
    console.log(userObj);
    const { name, email } = userObj;
    const data = { name, email };
    const user = await googleSignIn(data);
    setUser(user);
  }

  useEffect(() => {
    if (divRef.current) {
      /* global google */
      window.google.accounts.id.initialize({
        client_id:
          "152273172165-2j8j5jvmrtpop9kcuj2ktb7as4lv7kpa.apps.googleusercontent.com",
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
  }, [divRef.current]);

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
              <div id="signInDiv" ref={divRef} className="mt-2"></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
