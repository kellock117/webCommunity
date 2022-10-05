import React, { useContext, useState } from "react";
import { useForm } from "../util/hooks";
import { AuthContext } from "../context/authContext";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

const theme = createTheme();

export default function Register() {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState("");

  const { onChange, onSubmit, values } = useForm(createUserCallBack, {
    id: "",
    password: "",
    confirmPassword: "",
    userName: "",
  });

  const [createUser, { loading }] = useMutation(GQL_REGISTER, {
    update(_, { data: { createUser: userData } }) {
      context.login(userData);
      window.alert("Creation Successful");
      window.location.replace("/");
    },
    onError(error) {
      setErrors(error.message);
    },
    variables: values,
  });

  function createUserCallBack() {
    createUser();
    console.log(values);
  }

  return (
    <ThemeProvider theme={theme}>
      {{ loading } ? (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="id"
                    label="ID"
                    name="id"
                    autoFocus
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="userName"
                    label="User Name"
                    name="userName"
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    onChange={onChange}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              {errors.length > 0 ? (
                <Alert severity="error">{errors}</Alert>
              ) : (
                ""
              )}
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      ) : (
        <CircularProgress />
      )}
    </ThemeProvider>
  );
}

const GQL_REGISTER = gql`
  mutation createUserCallback(
    $id: String!
    $password: String!
    $confirmPassword: String!
    $userName: String!
  ) {
    createUser(
      registerInput: {
        id: $id
        password: $password
        confirmPassword: $confirmPassword
        userName: $userName
      }
    ) {
      id
      token
    }
  }
`;
