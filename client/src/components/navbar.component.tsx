import React, { useContext } from "react";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { AuthContext } from "../context/authContext.js";

export default function Logout() {
  const { user, logout } = useContext(AuthContext);

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Typography color="green" variant="h5">
          SIM
        </Typography>
        <Typography variant="h5" sx={{ flex: 1 }}>
          pleCommunity
        </Typography>

        {user && (
          <>
            <Typography variant="h6" sx={{ mr: 2 }}>
              {user.id}
            </Typography>
            <Button variant="outlined" onClick={logout} size="small">
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </React.Fragment>
  );
}
