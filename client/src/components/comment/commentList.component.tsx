import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/react-hooks";

import Comment from "./comment.component";
import NewComment from "./newComment.comment";
import { GQL_GET_COMMENTS } from "../../constants/comment";
import {
  CommentListProps,
  CommentProps,
} from "../../interface/comment.interface";
import { errorValue } from "../../context/errorContext";

import CircularProgress from "@mui/material/CircularProgress";
import Collapse from "@mui/material/Collapse/Collapse";
import CardContent from "@mui/material/CardContent/CardContent";
import Divider from "@mui/material/Divider/Divider";

const CommentList = ({ postId, expanded }: CommentListProps) => {
  const [comments, setComments] = useState<CommentProps[] | undefined>([]);

  const [getComments, { loading }] = useLazyQuery(GQL_GET_COMMENTS, {
    variables: {
      postId: postId,
    },
    onCompleted: data => {
      setComments(data.getComments);
    },
    onError: error => {
      errorValue(error);
    },
  });

  useEffect(() => {
    if (expanded && comments.length === 0) {
      getComments();
    }
  }, [expanded, comments.length, getComments]);

  if (loading) {
    return <CircularProgress style={{ marginLeft: "50%" }} />;
  }

  return (
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>
        <Divider />
        {comments &&
          comments.map((comment: CommentProps) => {
            return (
              <Comment
                key={comment.id}
                id={comment.id}
                postId={postId}
                content={comment.content}
                userName={comment.userName}
                time={comment.time}
                likes={comment.likes}
                comments={comments}
                setComments={setComments}
              />
            );
          })}
      </CardContent>
      <NewComment postId={postId} setComments={setComments} />
    </Collapse>
  );
};

export default CommentList;
