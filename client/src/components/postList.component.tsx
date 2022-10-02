import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Post from "./post.component";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";

const theme = createTheme();

interface PostProps {
  userID: string;
  id: React.Key;
  title: string;
  time: string;
  content: string;
  likes: string[];
}

export default function PostList() {
  const { data, loading, error } = useQuery(GQL_GET_ALL_POSTS);
  let { user } = useContext(AuthContext);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  if (data) {
    const { getAllPosts: posts } = data;

    return (
      <ThemeProvider theme={theme}>
        <main>
          <Box
            sx={{
              bgcolor: "background.paper",
              pt: 8,
              pb: 6,
            }}
          ></Box>
          <Container maxWidth="md">
            <Grid container spacing={8} justifyContent="center">
              {posts.map((post: PostProps) => {
                return (
                  <Post
                    key={post.id}
                    userID={user.id}
                    id={post.id}
                    title={post.title}
                    time={post.time}
                    content={post.content}
                    likes={post.likes}
                  />
                );
              })}
            </Grid>
          </Container>
        </main>
      </ThemeProvider>
    );
  }
}

const GQL_GET_ALL_POSTS = gql`
  query GetAllPosts {
    getAllPosts {
      id
      title
      userID
      content
      time
      likes
    }
  }
`;
