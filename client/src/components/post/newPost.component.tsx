import React from "react";
import { useForm } from "../../util/hooks";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme();

export default function NewPost() {
  const { onChange, onSubmit, values } = useForm(createPostCallBack, {
    title: "",
    content: "",
  });

  const [createPost] = useMutation(GQL_CREATE_POST, {
    refetchQueries: [{ query: GQL_GET_ALL_POSTS }],
    variables: values,
  });

  function createPostCallBack() {
    createPost();
  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Paper variant="outlined" sx={{ my: 5, p: 5 }}>
          <Typography component="h1" variant="h4" align="center">
            New Post
          </Typography>
          <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  title="title"
                  label="Title"
                  name="title"
                  autoFocus
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="content"
                  label="Content"
                  title="content"
                  multiline
                  rows={6}
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
              Post
            </Button>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

const GQL_CREATE_POST = gql`
  mutation createPostCallback($title: String!, $content: String!) {
    createPost(createPostInput: { title: $title, content: $content }) {
      id
      title
      userID
      content
      time
      likes
      comments {
        userID
        content
        time
        likes
      }
    }
  }
`;

const GQL_GET_ALL_POSTS = gql`
  query GetAllPosts {
    getAllPosts {
      id
      title
      userID
      content
      time
      likes
      comments {
        userID
        content
        time
        likes
      }
    }
  }
`;
