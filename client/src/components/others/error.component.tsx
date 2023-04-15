import React, { useState, useEffect } from "react";
import { ApolloError, useReactiveVar } from "@apollo/client";

import { errorValue } from "../../context/errorContext";

import { Snackbar } from "@mui/material";
import IconButton from "@mui/material/IconButton";

const Error = () => {
  const [open, setOpen] = useState<boolean>(false);
  const error: ApolloError = useReactiveVar(errorValue);

  const handleClose = (): void => {
    setOpen(false);
  };

  useEffect(() => {
    if (error !== null) setOpen(true);
  }, [error]);

  if (error?.message === "Invalid/Expired token") window.location.reload();

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={open}
      onClose={handleClose}
      message={error?.message}
      action={
        <React.Fragment>
          <IconButton
            size="small"
            style={{ color: "white" }}
            onClick={handleClose}
          >
            X
          </IconButton>
        </React.Fragment>
      }
    />
  );
};

export default Error;
