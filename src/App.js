import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SearchMap from "./pages/SearchMap/SearchMap";
import { Landing } from "./pages/Landing/Landing";
import Event from "./pages/Event/Event";
import Spending from "./pages/Spending/Spending";
import { getUser } from "./utilities/service/user";
import { logout } from "./utilities/service/user";

const App = () => {
  const [user, setUser] = useState(getUser);
  const [showGoogleSignIn, setShowGoogleSignIn] = useState(true);

  function handleLogOut() {
    logout();
    setUser(null);
    setShowGoogleSignIn(true);
  }

  return (
    <main className="App">
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
    </main>
  );
};

export default App;
