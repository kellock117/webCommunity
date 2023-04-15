import React, { useState } from "react";
import { isMobile } from "react-device-detect";

import Like from "./likePost.component";
import CommentList from "../comment/commentList.component";
import DeletePost from "./deletePost.component";
import { PostProps } from "../../interface/post.interface";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";

function getTimeInformation(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  const second = String(date.getSeconds()).padStart(2, "0");

  return `${year}.${month}.${day} ${hour}:${minute}:${second}`;
}

const Post = ({
  id,
  title,
  userName,
  content,
  time,
  likes,
  comments,
}: PostProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const postDate: Date = new Date(Number(time));

  const gridSize: number = isMobile ? 12 : 8;

  const onClickCommentButton = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid item key={id} xs={gridSize} justifyContent="center">
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardHeader
          title={title}
          subheader={
            <>
              <Typography
                display="inline"
                sx={{
                  mr: 1,
                }}
              >
                {userName}
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
          action={<DeletePost userName={userName} postId={id} />}
        ></CardHeader>
        <CardContent>
          <Typography variant="h5">{content}</Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Like key={id} postId={id} likes={likes} />
          <IconButton
            onClick={onClickCommentButton}
            style={{ color: "#50bcdf" }}
            aria-label="comments"
          >
            <CommentIcon sx={{ mr: 0.5 }} />
            {comments.length}
          </IconButton>
        </CardActions>
        <CommentList key={id} postId={id} expanded={expanded} />
      </Card>
    </Grid>
  );
};

export default Post;
