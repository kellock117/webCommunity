import "./App.css";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/main.js";
import Register from "./pages/register.js";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
