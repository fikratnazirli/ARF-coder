import React, { useState } from "react";
import ReactDOM from "react-dom/client";

import HeaderLogin from "./ReactLoginHeader";
import Hero from "./hero";
import "./index.css";

function MainPage() {
  const [user, setUser] = useState(null);
  const [myAnimals, setMyAnimals] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // Wrap root with className controlling dark mode
  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="w-full min-h-screen bg-gray-100 dark:bg-[#0b1220] transition-colors duration-300">
        <HeaderLogin
          user={user}
          setUser={setUser}
          myAnimals={myAnimals}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
        <Hero user={user} myAnimals={myAnimals} setMyAnimals={setMyAnimals} />
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MainPage />
  </React.StrictMode>
);
