export interface PostsProps {
  page: number;
  lastPostId: any;
  nextPage: any;
  previousPage: any;
}

export interface PostProps {
  id: React.Key;
  userName: string;
  title: string;
  time: string;
  content: string;
  likes: string[];
  comments: string[];
}

export interface DeletePostProps {
  postId: React.Key;
  userName: string;
}

export interface LikePostProps {
  postId: React.Key;
  likes: string[];
}
