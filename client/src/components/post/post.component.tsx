import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";

import Like from "./likePost.component";
import Comment from "../comment/comment.component";
import DeletePost from "./deletePost.component";
import { PostProps } from "../../interface/post.interface";
import { CommentProps } from "../../interface/comment.interface";
import { useLazyQuery } from "@apollo/react-hooks";
import { GQL_GET_COMMENTS } from "../../constants/comment";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import CircularProgress from "@mui/material/CircularProgress";

function getTimeInformation(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  const second = String(date.getSeconds()).padStart(2, "0");

  return `${year}.${month}.${day} ${hour}:${minute}:${second}`;
}

const Post = (post: PostProps) => {
  const [comments, setComments] = useState<CommentProps[] | undefined>([]);

  const [expanded, setExpanded] = useState(false);
  const postDate = new Date(Number(post.time));

  const [getComments, { data, loading }] = useLazyQuery(GQL_GET_COMMENTS, {
    variables: {
      postId: post.id,
    },
  });

  const onClick = () => {
    setExpanded(!expanded);
    if (data === undefined) getComments();
  };

  const gridSize = isMobile ? 12 : 8;

  useEffect(() => {
    setComments(data?.getComments);
  }, [data]);

  if (loading) {
    return <CircularProgress style={{ marginLeft: "50%" }} />;
  }

  return (
    <Grid item key={post.id} xs={gridSize} justifyContent="center">
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardHeader
          title={post.title}
          subheader={
            <>
              <Typography
                display="inline"
                sx={{
                  mr: 1,
                }}
              >
                {post.userName}
              </Typography>
              <Typography display="inline">
                {getTimeInformation(postDate)}
              </Typography>
            </>
          }
          titleTypographyProps={{
            variant: "h5",
            fontWeight: "bold",
          }}
          action={
            <DeletePost
              currentUser={post.currentUser}
              userName={post.userName}
              postId={post.id}
            />
          }
        ></CardHeader>
        <CardContent>
          <Typography variant="h5">{post.content}</Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Like
            key={post.id}
            id={post.id}
            currentUser={post.currentUser}
            likes={post.likes}
          />
          <IconButton
            onClick={onClick}
            style={{ color: "#50bcdf" }}
            aria-label="comments"
          >
            <CommentIcon sx={{ mr: 0.5 }} />
            {post.comments.length}
          </IconButton>
        </CardActions>
        <Comment
          key={post.id}
          postId={post.id}
          comments={comments}
          setComments={setComments}
          currentUser={post.currentUser}
          expanded={expanded}
        />
      </Card>
    </Grid>
  );
};

export default Post;
