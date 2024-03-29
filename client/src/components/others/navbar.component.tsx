import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";

import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function Logout() {
  const { user, logout } = useContext(AuthContext);
  const goHome = () => {
    window.location.replace("/");
  };

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <ButtonBase>
          <Typography color="green" variant="h5" onClick={goHome}>
            SIM
          </Typography>
          <Typography variant="h5" onClick={goHome}>
            pleCommunity
          </Typography>
        </ButtonBase>
        {user && (
          <>
            <Typography variant="h6" sx={{ mr: 2, flex: 1 }} align="right">
              {user.userName}
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
