import React, { useState } from "react";
import Like from "./likePost.component";
import Comment from "../comment/comment.component";
import DeletePost from "./deletePost.component";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";

interface PostProps {
  currentUser: string;
  userID: string;
  id: React.Key;
  title: string;
  time: string;
  content: string;
  likes: string[];
}

export default function Post(post: PostProps) {
  const postDate = new Date(post.time);

  const [commentLength, setCommentLength] = useState(0);

  const [expanded, setExpanded] = useState(false);
  const onClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid item key={post.id} xs={8} justifyContent="center">
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
                {post.userID}
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
              userID={post.userID}
              postID={post.id}
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
            {commentLength}
          </IconButton>
        </CardActions>
        <Comment
          key={post.id}
          postID={post.id}
          currentUser={post.currentUser}
          expanded={expanded}
          setCommentLength={setCommentLength}
        />
      </Card>
    </Grid>
  );
}

function getTimeInformation(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  const second = String(date.getSeconds()).padStart(2, "0");

  return `${year}.${month}.${day} ${hour}:${minute}:${second}`;
}
