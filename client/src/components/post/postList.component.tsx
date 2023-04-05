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
  lastPostId: any;
  nextPage: any;
  previousPage: any;
}

export default function PostList({
  data,
  loading,
  error,
  page,
  lastPostId,
  nextPage,
  previousPage,
}: Props) {
  const { user } = useContext(AuthContext);

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

  if (data) {
    const posts: Array<PostProps> = data.getPostByPage;

    if (posts.length === 0) {
      return (
        <Alert severity="error">
          No more posts. Press the logo to go to the first page.
        </Alert>
      );
    }

    if (loading) {
      return <CircularProgress style={{ marginLeft: "40%" }} />;
    }

    if (error) {
      return <Alert severity="error">{error.message}</Alert>;
    }

    // when the data is ready, store the last id for the pagination
    lastPostId.current = posts.at(-1).id;

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
  }
}
