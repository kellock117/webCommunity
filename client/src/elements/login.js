import React, { useContext, useState } from "react";
import { useForm } from "../util/hooks";
import { AuthContext } from "../context/authContext";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

// material ui for designing
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

export default function Login(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    id: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(GQL_LOGIN, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
    },
    onError(error) {
      setErrors(error.message);
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
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
              Sign in
            </Typography>
            <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="id"
                label="ID"
                name="id"
                autoFocus
                onChange={onChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={onChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              {errors.length > 0 ? (
                <Alert severity="error">{errors}</Alert>
              ) : (
                ""
              )}
              <Grid container>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      ) : (
        <CircularProgress align="center" />
      )}
    </ThemeProvider>
  );
}

const GQL_LOGIN = gql`
  mutation loginUserCallback($id: String!, $password: String!) {
    login(loginInput: { id: $id, password: $password }) {
      id
      token
    }
  }
`;
