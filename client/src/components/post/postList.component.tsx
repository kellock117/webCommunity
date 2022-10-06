import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import Post from "./post.component";

import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

const theme = createTheme();

interface PostProps {
  currentUser: string;
  userName: string;
  id: React.Key;
  title: string;
  time: string;
  content: string;
  likes: string[];
}

interface Props {
  data: any;
  loading: boolean;
  error: any;
  page: number;
  nextPage: any;
  previousPage: any;
}

export default function PostList(props: Props) {
  const { user } = useContext(AuthContext);

  if (props.loading) {
    return <CircularProgress style={{ marginLeft: "40%" }} />;
  }

  if (props.error) {
    return <Alert severity="error">{props.error.message}</Alert>;
  }

  if (props.data) {
    const posts = props.data.getPostByPage;

    if (posts.length === 0) {
      return (
        <Alert severity="error">
          No more posts. Press logo to go to the first page
        </Alert>
      );
    }

    return (
      <ThemeProvider theme={theme}>
        <main>
          <Container maxWidth="md">
            <Grid container spacing={8} justifyContent="center">
              {posts.map((post: PostProps) => {
                return (
                  <Post
                    key={post.id}
                    currentUser={user.userName}
                    userName={post.userName}
                    id={post.id}
                    title={post.title}
                    time={post.time}
                    content={post.content}
                    likes={post.likes}
                  />
                );
              })}
            </Grid>
            {props.page === 1 ? (
              <Button
                variant="contained"
                onClick={props.nextPage}
                size="large"
                sx={{ marginLeft: "40%", mt: 3 }}
              >
                Load More
              </Button>
            ) : (
              <Grid container>
                <Grid xs={6}>
                  <Button
                    variant="contained"
                    onClick={props.previousPage}
                    size="large"
                    sx={{ marginLeft: "55%", mt: 3 }}
                  >
                    Previous Page
                  </Button>
                </Grid>
                <Grid xs={6}>
                  <Button
                    variant="contained"
                    onClick={props.nextPage}
                    size="large"
                    sx={{ mt: 3 }}
                  >
                    Load More
                  </Button>
                </Grid>
              </Grid>
            )}
          </Container>
        </main>
      </ThemeProvider>
    );
  }
}
