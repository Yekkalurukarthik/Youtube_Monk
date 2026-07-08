
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Login from "./Pages/Login/Login.jsx";
import Signup from "./Pages/SignUp/SignUp.jsx";
import Dashboard from "./Dashboard.jsx";

function App() {

  const [token, setToken] = useState(null);

  useEffect(() => {

    window.postMessage({
      type: "GET_TOKEN",
    }, "*");

    const handler = (event) => {

      if (event.data.type === "TOKEN_RESPONSE") {

        setToken(event.data.token);
        {console.log("Token is :",event.data.token)};

      }

    };

    window.addEventListener("message", handler);

    return () => {
      window.removeEventListener("message", handler);
    };

  }, []);

  return (
    <Routes>

      <Route
        path="/"
        element={
          token
            ? <Dashboard token={token} />
            : <Navigate to="/login" />
        }
      />

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      <Route
        path="/dashboard"
        element={
          token
            ? <Dashboard token={token} />
            : <Navigate to="/login" />
        }
      />

    </Routes>
  );
}

export default App;