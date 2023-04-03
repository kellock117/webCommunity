import { gql } from "apollo-server";

const typeDefs = gql`
  type Post {
    id: ID!
    title: String!
    userName: String!
    content: String!
    time: String!
    likes: [String]
    comments: [Comment]
  }

  input CreatePostInput {
    title: String!
    content: String!
  }

  type Query {
    getPostByPage(page: Int!): [Post]
  }

  type Mutation {
    createPost(createPostInput: CreatePostInput): Post!
    deletePost(postID: ID!): String!
    likePost(postID: ID!): Post!
  }
`;

export default typeDefs;
