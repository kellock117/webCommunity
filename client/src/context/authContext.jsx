import jwt_decode from "jwt-decode";
import React, { useReducer, createContext } from "react";

const initialState = {
  user: null,
};

if (localStorage.getItem(process.env.REACT_APP_KEY)) {
  const decodedToken = jwt_decode(
    localStorage.getItem(process.env.REACT_APP_KEY)
  );
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem(process.env.REACT_APP_KEY);
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext({
  user: null,
  login: userData => {},
  logout: () => {},
});

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: state,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

const AuthProvider = props => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = userData => {
    localStorage.setItem(process.env.REACT_APP_KEY, userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };

  const logout = () => {
    localStorage.removeItem(process.env.REACT_APP_KEY);
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
};

export { AuthContext, AuthProvider };
