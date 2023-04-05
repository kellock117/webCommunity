import gql from "graphql-tag";

const typeDefs = gql`
  type Comment {
    id: ID!
    userName: String!
    content: String!
    time: String!
    likes: [String]
  }

  type Query {
    getComments(postID: String!): [Comment]
  }

  input CreateCommentInput {
    postID: String!
    content: String!
  }
  type Mutation {
    createComment(createCommentInput: CreateCommentInput): Comment!
    deleteComment(commentID: ID!): String!
    likeComment(commentID: ID!): Comment
  }
`;

export default typeDefs;
