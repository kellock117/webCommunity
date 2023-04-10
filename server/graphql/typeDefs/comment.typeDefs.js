import gql from "graphql-tag";

const typeDefs = gql`
  type Comment {
    id: ID!
    userName: String!
    content: String!
    time: String!
    likes: [String]
  }

  input CreateCommentInput {
    postId: String!
    content: String!
  }

  type Query {
    getComments(postId: String!): [Comment]
  }

  type Mutation {
    createComment(createCommentInput: CreateCommentInput): Comment!
    deleteComment(postId: ID!, commentId: ID!): String!
    likeComment(commentId: ID!): String!
  }
`;

export default typeDefs;
