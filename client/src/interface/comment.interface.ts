export interface CommentListProps {
  postId: React.Key;
  expanded: boolean;
}

export interface CommentProps {
  id: React.Key;
  postId: React.Key;
  content: string;
  userName: string;
  time: string;
  likes: string[];
  comments: CommentProps[];
  setComments: React.Dispatch<React.SetStateAction<CommentProps[]>>;
}

export interface NewCommentProps {
  postId: React.Key;
  setComments: React.Dispatch<React.SetStateAction<CommentProps[]>>;
}

export interface LikeCommentProps {
  commentId: React.Key;
  likes: string[];
}

export interface DeleteCommentProps {
  commentId: React.Key;
  postId: React.Key;
  comments: CommentProps[];
  setComments: React.Dispatch<React.SetStateAction<CommentProps[]>>;
  userName: string;
}
