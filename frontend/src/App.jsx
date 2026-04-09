import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login/Login.jsx";
import Signup from "./Pages/SignUp/SignUp.jsx";
import Dashboard from "./Dashboard";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/" element={token ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={ <Dashboard /> }/>
    </Routes>
  );
}

export default App;