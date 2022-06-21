import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { AuthContext } from "../context/authContext.js";

export default function Logout(props) {
  const { user, logout } = useContext(AuthContext);

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          SIMpleCOMMunity
        </Typography>
        <Button variant="outlined" onClick={logout} size="small">
          Logout
        </Button>
      </Toolbar>
    </React.Fragment>
  );
}
