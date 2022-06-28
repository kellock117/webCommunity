import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme();

export default function PostList() {
  const { data, loading, error } = useQuery(GQL_GET_ALL_POSTS);

  if (loading) {
    console.log("loading");
    return <CircularProgress align="center" />;
  }

  if (error) {
    return `Error: ${error.message}`;
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
          <Container sx={{ py: 8 }} maxWidth="md">
            <Grid container spacing={4}>
              {posts.map(post => (
                <Grid item key={post.id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {post.title} {post.time}
                      </Typography>
                      <Typography>{post.content}</Typography>
                    </CardContent>
                    {post.comments
                      ? post.comments.map(comment => (
                          <CardContent sx={{ flexGrow: 1 }}>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              {comment.title} {comment.time}
                            </Typography>
                            <Typography>{comment.content}</Typography>
                          </CardContent>
                        ))
                      : ""}
                  </Card>
                </Grid>
              ))}
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
      comments {
        userID
        content
        time
        likes
      }
    }
  }
`;
