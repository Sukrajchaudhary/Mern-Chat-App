import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";

function App() {
  const { authUser } = useAuthContext();
  return (
    <Routes>
      <Route
        path="/"
        element={authUser ? <Home /> : <Navigate to="/signup" />}
      />
      <Route
        path="/login"
        element={authUser ? <Navigate to="/"></Navigate> : <Login />}
      />
      <Route
        path="/signup"
        element={authUser ? <Navigate to="/" /> : <Signup />}
      />
    </Routes>
  );
}

export default App;
