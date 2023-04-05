import gql from "graphql-tag";

export const GQL_GET_POST_BY_PAGE = gql`
  query GetPostByPage($page: Int!, $lastPostId: String!) {
    getPostByPage(
      getPostByPageInput: { page: $page, lastPostId: $lastPostId }
    ) {
      id
      title
      userName
      content
      time
      likes
    }
  }
`;

export const GQL_CREATE_POST = gql`
  mutation createPostCallback($title: String!, $content: String!) {
    createPost(createPostInput: { title: $title, content: $content }) {
      id
      title
      userName
      content
      time
      likes
    }
  }
`;

export const GQL_LIKE_POST = gql`
  mutation LikePost($postId: ID!) {
    likePost(postId: $postId)
  }
`;

export const GQL_DELETE_POST = gql`
  mutation DeletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;
