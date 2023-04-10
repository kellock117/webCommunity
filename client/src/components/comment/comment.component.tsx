import React, { Fragment } from "react";

import { PostProps, CommentProps } from "../../interface/comment.interface";
import NewComment from "./newComment.comment";
import LikeComment from "./likeComment.component";
import DeleteComment from "./deleteComment.component";

import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";

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
  comments,
  setComments,
  expanded,
  postId,
  currentUser,
}: PostProps) => {
  return (
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>
        <Divider />
        {comments &&
          comments.map((comment: CommentProps) => {
            return (
              <Fragment key={comment.id}>
                <ListItem key={comment.id} alignItems="flex-start">
                  <ListItemText
                    primary={
                      <>
                        <Typography
                          sx={{ fontWeight: "bold" }}
                          component="span"
                        >
                          {comment.userName}
                        </Typography>
                        <DeleteComment
                          postId={postId}
                          comments={comments}
                          commentId={comment.id}
                          setComments={setComments}
                          currentUser={currentUser}
                          userName={comment.userName}
                        />
                      </>
                    }
                    secondary={
                      <>
                        <Typography
                          variant="body2"
                          component="span"
                          color="textPrimary"
                        >
                          {comment.content}
                        </Typography>
                        <br />
                        {showTime(comment.time)}
                        <LikeComment
                          id={comment.id}
                          currentUser={currentUser}
                          likes={comment.likes}
                        />
                      </>
                    }
                  />
                </ListItem>
                <Divider />
              </Fragment>
            );
          })}
      </CardContent>
      <NewComment postId={postId} setComments={setComments} />
    </Collapse>
  );
};

export default Comment;
