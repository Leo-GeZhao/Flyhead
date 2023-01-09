import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SearchMap from "./pages/SearchMap/SearchMap";
import { Landing } from "./pages/Landing/Landing";
import Event from "./pages/Event/Event";
import Spending from "./pages/Spending/Spending";
import { getUser } from "./utilities/service/user";
import { logout } from "./utilities/service/user";

const App = () => {
  const [user, setUser] = useState(null);

  function handleLogOut() {
    logout();
    setUser(null);
  }

  return (
    <main className="App">
      <Routes>
        {!user ? (
          <Route path="/" element={<Landing user={user} setUser={setUser} />} />
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
            <Route path="/map" element={<SearchMap />} />
            <Route path="/event" element={<Event />} />
            <Route path="/spending" element={<Spending />} />
          </>
        )}
      </Routes>
    </main>
  );
};

export default App;
