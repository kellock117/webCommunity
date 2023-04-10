export interface PostsProps {
  loading: boolean;
  error: any;
  page: number;
  lastPostId: any;
  nextPage: any;
  previousPage: any;
}

export interface PostProps {
  currentUser: string;
  userName: string;
  id: React.Key;
  title: string;
  time: string;
  content: string;
  likes: string[];
  comments: string[];
}

export interface DeletePostProps {
  postId: React.Key;
  currentUser: string;
  userName: string;
}

export interface LikePostProps {
  id: React.Key;
  currentUser: string;
  likes: string[];
}
