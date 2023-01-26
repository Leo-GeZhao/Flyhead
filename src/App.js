import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

//Components
import { Landing } from "./pages/Landing/Landing";
import SearchMap from "./pages/SearchMap/SearchMap";
import Event from "./pages/Event/Event";
import Spending from "./pages/Spending/Spending";

//User Service
import * as userService from "./utilities/service/user";

const App = () => {
  const [user, setUser] = useState(userService.getUser);
  const [showGoogleSignIn, setShowGoogleSignIn] = useState(true);

  function handleLogOut() {
    userService.logout();
    setUser(null);
    setShowGoogleSignIn(true);
  }

  return (
    <>
      <Routes>
        {!user ? (
          <Route
            path="/"
            element={
              <Landing
                user={user}
                setUser={setUser}
                showGoogleSignIn={showGoogleSignIn}
                setShowGoogleSignIn={setShowGoogleSignIn}
              />
            }
          />
        ) : (
          <>
            <Route
              path="/"
              element={
                <Landing
                  user={user}
                  setUser={setUser}
                  handleLogOut={handleLogOut}
                />
              }
            />
            <Route path="/map" element={<SearchMap user={user} />} />
            <Route path="/event" element={<Event user={user} />} />
            <Route path="/spending" element={<Spending user={user} />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
