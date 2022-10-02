import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import AuthRoute from "./util/authRoute";

import Main from "./pages/main";
import Login from "./pages/login";
import Register from "./pages/register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthRoute />}>
        <Route path="/" element={<Main />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
