import { useContext } from "react";
import { AuthContext } from "../context/authContext.js";
import Login from "../components/login.js";
import Logout from "../components/logout.js";

export default function Main() {
  const { user } = useContext(AuthContext);

  return <div>{!user ? <Login /> : <Logout />}</div>;
}
