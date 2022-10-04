import React, { Fragment, useEffect } from "react";
import LikeComment from "./likeComment.component";
import DeleteComment from "./deleteComment.component";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useForm } from "../../util/hooks";
import gql from "graphql-tag";

import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

interface CommentProps {
  id: React.Key;
  content: string;
  userID: string;
  time: string;
  likes: string[];
}

interface Props {
  currentUser: string;
  postID: React.Key;
  expanded: boolean;
  setCommentLength: any;
}

export default function Comment(props: Props) {
  const { data: { getComments } = {} } = useQuery(GQL_GET_COMMENTS, {
    variables: {
      postID: props.postID,
    },
  });

  const { onChange, onSubmit, values } = useForm(createCommentCallback, {
    postID: props.postID,
    content: "",
  });

  const [createComment] = useMutation(GQL_CREATE_COMMENT, {
    refetchQueries: [
      { query: GQL_GET_COMMENTS, variables: { postID: props.postID } },
    ],
    variables: values,
  });

  function createCommentCallback() {
    createComment();
  }

  const currentTime = new Date();

  useEffect(() => {
    if (getComments) {
      props.setCommentLength(getComments.length);
    }
  });

  if (!getComments) {
    return <CircularProgress style={{ marginLeft: "50%" }} />;
  } else {
    const comments = getComments;

    return (
      <Collapse in={props.expanded} timeout="auto" unmountOnExit>
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
                            {comment.userID}
                          </Typography>
                          <DeleteComment
                            postID={props.postID}
                            commentID={comment.id}
                            currentUser={props.currentUser}
                            userID={comment.userID}
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
                          {showTime(currentTime, new Date(comment.time))}
                          <LikeComment
                            id={comment.id}
                            currentUser={props.currentUser}
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
        <Box component="form" onSubmit={onSubmit}>
          <Grid item xs={12}>
            <TextField
              required
              title="content"
              label="Add Comment..."
              name="content"
              autoFocus
              onChange={onChange}
              sx={{ m: 2, width: "49ch" }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3 }}
              size="large"
            >
              Add
            </Button>
          </Grid>
        </Box>
      </Collapse>
    );
  }
}

function showTime(currentTime: Date, commentTime: Date) {
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

const GQL_GET_COMMENTS = gql`
  query GetComments($postID: String!) {
    getComments(postID: $postID) {
      id
      userID
      content
      time
      likes
    }
  }
`;

const GQL_CREATE_COMMENT = gql`
  mutation createCommentCallback($postID: String!, $content: String!) {
    createComment(createCommentInput: { postID: $postID, content: $content }) {
      id
      userID
      content
      time
      likes
    }
  }
`;
