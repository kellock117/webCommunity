import jwtDecode from "jwt-decode";
import React, { useReducer, createContext } from "react";

const initialState = {
  user: null,
};

if (localStorage.getItem(process.env.REACT_APP_KEY)) {
  const decodedToken = jwtDecode(
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

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = userData => {
    localStorage.setItem(process.env.REACT_APP_KEY, userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };

  function logout() {
    localStorage.removeItem(process.env.REACT_APP_KEY);
    dispatch({ type: "LOGOUT" });
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
