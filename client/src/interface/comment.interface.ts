export interface PostProps {
  currentUser: string;
  postId: React.Key;
  comments: CommentProps[];
  setComments: React.Dispatch<React.SetStateAction<CommentProps[]>>;
  expanded: boolean;
}

export interface CommentProps {
  id: React.Key;
  content: string;
  userName: string;
  time: string;
  likes: string[];
}

export interface NewCommentProps {
  postId: React.Key;
  setComments: React.Dispatch<React.SetStateAction<CommentProps[]>>;
}

export interface LikeCommentProps {
  id: React.Key;
  currentUser: string;
  likes: string[];
}

export interface DeleteCommentProps {
  postId: React.Key;
  comments: CommentProps[];
  commentId: React.Key;
  setComments: React.Dispatch<React.SetStateAction<CommentProps[]>>;
  currentUser: string;
  userName: string;
}
