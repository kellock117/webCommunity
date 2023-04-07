import gql from "graphql-tag";

export const GQL_GET_COMMENTS = gql`
  query GetComments($postId: String!) {
    getComments(postId: $postId) {
      id
      userName
      content
      time
      likes
    }
  }
`;

export const GQL_CREATE_COMMENT = gql`
  mutation CreateComment($postId: String!, $content: String!) {
    createComment(createCommentInput: { postId: $postId, content: $content }) {
      id
      userName
      content
      time
      likes
    }
  }
`;

export const GQL_DELETE_COMMENT = gql`
  mutation DeleteComment($commentId: ID!) {
    deleteComment(commentId: $commentId)
  }
`;

export const GQL_LIKE_COMMENT = gql`
  mutation LikeComment($commentId: ID!) {
    likeComment(commentId: $commentId)
  }
`;
