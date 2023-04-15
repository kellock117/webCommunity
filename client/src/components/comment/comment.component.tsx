import React, { Fragment } from "react";

import { CommentProps } from "../../interface/comment.interface";
import LikeComment from "./likeComment.component";
import DeleteComment from "./deleteComment.component";

import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

function showTime(time: String) {
  const commentTime = new Date(Number(time));
  const currentTime = new Date();
  let timeGap = (currentTime.getTime() - commentTime.getTime()) / (1000 * 60);

  if (timeGap >= 43200) {
    if (timeGap >= 86400) return `${Math.floor(timeGap / 43200)} months ago`;
    return "a month ago";
  } else if (timeGap >= 10080) {
    if (timeGap >= 20160) return `${Math.floor(timeGap / 10080)} weeks ago`;
    else return "a week ago";
  } else if (timeGap >= 1440) {
    if (timeGap >= 2880) return `${Math.floor(timeGap / 1440)} days ago`;
    else return "a day ago";
  } else if (timeGap >= 60) {
    if (timeGap >= 120) return `${Math.floor(timeGap / 60)} hours ago`;
    else return "an hour ago";
  } else {
    if (timeGap >= 2) return `${Math.floor(timeGap)} minutes ago`;
    else return "a minute ago";
  }
}

const Comment = ({
  id,
  postId,
  content,
  userName,
  time,
  likes,
  comments,
  setComments,
}: CommentProps) => {
  return (
    <Fragment key={id}>
      <ListItem key={id} alignItems="flex-start">
        <ListItemText
          primary={
            <>
              <Typography sx={{ fontWeight: "bold" }} component="span">
                {userName}
              </Typography>
              <DeleteComment
                postId={postId}
                comments={comments}
                commentId={id}
                setComments={setComments}
                userName={userName}
              />
            </>
          }
          secondary={
            <>
              <Typography variant="body2" component="span" color="textPrimary">
                {content}
              </Typography>
              <br />
              {showTime(time)}
              <LikeComment commentId={id} likes={likes} />
            </>
          }
        />
      </ListItem>
      <Divider />
    </Fragment>
  );
};

export default Comment;
