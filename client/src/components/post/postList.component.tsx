import React from "react";
import { useReactiveVar } from "@apollo/client";

import Post from "./post.component";
import { postsValue } from "../../context/postContext";
import { PostProps, PostsProps } from "../../interface/post.interface";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

const theme = createTheme();

const PostList = ({ page, lastPostId, nextPage, previousPage }: PostsProps) => {
  const posts = useReactiveVar(postsValue);

  const createLoadMoreButton = ({ marginLeft }: { marginLeft: boolean }) => {
    const sxVariables: any = { mt: 3 };
    if (marginLeft) sxVariables["marginLeft"] = "40%";

    const loadMoreButton = (
      <Button
        variant="contained"
        onClick={nextPage}
        size="large"
        sx={sxVariables}
      >
        Load More
      </Button>
    );

    return loadMoreButton;
  };

  if (posts?.length === 0) {
    return (
      <Alert severity="error">
        No more posts. Press the logo to go to the first page.
      </Alert>
    );
  }

  // when the data is ready, store the last id for the pagination
  lastPostId.current = posts?.at(-1)?.id;

  return (
    <ThemeProvider theme={theme}>
      <main>
        <Container maxWidth="md">
          <Grid container spacing={8} justifyContent="center">
            {posts.map((post: PostProps) => {
              return (
                <Post
                  key={post.id}
                  id={post.id}
                  userName={post.userName}
                  title={post.title}
                  time={post.time}
                  content={post.content}
                  likes={post.likes}
                  comments={post.comments}
                />
              );
            })}
          </Grid>
          {/* next page or previous page button */}
          {page === 1 ? (
            createLoadMoreButton({ marginLeft: true })
          ) : (
            <Grid container>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  onClick={previousPage}
                  size="large"
                  sx={{ marginLeft: "55%", mt: 3 }}
                >
                  Previous Page
                </Button>
              </Grid>
              <Grid item xs={6}>
                {createLoadMoreButton({ marginLeft: false })}
              </Grid>
            </Grid>
          )}
        </Container>
      </main>
    </ThemeProvider>
  );
};

export default PostList;
