import { useContext } from "react";
import { AuthContext } from "../context/authContext.js";
import Login from "../elements/login.js";
import NavBar from "../elements/navbar.js";

export default function Main() {
  const { user } = useContext(AuthContext);

  return <div>{!user ? <Login /> : <NavBar />}</div>;
}
