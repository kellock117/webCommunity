import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

// import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Alert from "@mui/material/Alert";

const theme = createTheme();

export default function PostList() {
  const { data, loading, error } = useQuery(GQL_GET_ALL_POSTS);

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
          <Container sx={{ py: 8 }} maxWidth="md">
            <Grid container spacing={4}>
              {posts.map(
                (post: {
                  time: string | number | Date;
                  id: React.Key;
                  title: any;
                  content:
                    | string
                    | number
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | React.ReactFragment
                    | React.ReactPortal;
                  comments: any[];
                }) => {
                  const postDate = new Date(post.time);

                  return (
                    <Grid item key={post.id} xs={12} sm={6} md={4}>
                      <Card
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <CardHeader
                          title={post.title}
                          subheader={`${postDate.getDay()} ${convertMonth(
                            postDate.getMonth()
                          )}, ${postDate.getFullYear()}`}
                          titleTypographyProps={{
                            variant: "h4",
                            fontWeight: "bold",
                          }}
                        ></CardHeader>
                        <CardContent>
                          <Typography variant="h5">{post.content}</Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                          <IconButton aria-label="likes">
                            <FavoriteIcon style={{ color: "red" }} />
                          </IconButton>
                          <IconButton
                            style={{ color: "#50bcdf" }}
                            aria-label="comments"
                          >
                            <CommentIcon />
                          </IconButton>
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                }
              )}
            </Grid>
          </Container>
        </main>
      </ThemeProvider>
    );
  }
}

function convertMonth(number: number) {
  if (number === 1) return "January";
  else if (number === 2) return "February";
  else if (number === 3) return "March";
  else if (number === 4) return "April";
  else if (number === 5) return "May";
  else if (number === 6) return "June";
  else if (number === 7) return "July";
  else if (number === 8) return "August";
  else if (number === 9) return "September";
  else if (number === 10) return "October";
  else if (number === 11) return "November";
  else if (number === 12) return "December";

  return "Invalid Input";
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
