import React from "react";
import { Link } from "react-router-dom";

import "./header.css";

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand ps-3" href="/">
            FlyHead
          </Link>
          <div className="navbar-nav d-flex flex-row">
            <Link to="/map" className="mx-2 nav-link">
              Map
            </Link>
            <Link to="/event" className="mx-2 nav-link">
              Events
            </Link>
            <Link to="/spending" className="mx-2 nav-link">
              Spending
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
