import gql from "graphql-tag";

const typeDefs = gql`
  type Post {
    id: ID!
    title: String!
    userName: String!
    content: String!
    time: String!
    likes: [String]
  }

  input GetPostByPageInput {
    page: Int!
    lastPostId: String!
  }

  input CreatePostInput {
    title: String!
    content: String!
  }

  type Query {
    getPostByPage(getPostByPageInput: GetPostByPageInput): [Post]
  }

  type Mutation {
    createPost(createPostInput: CreatePostInput): Post!
    deletePost(postId: ID!): String!
    likePost(postId: ID!): String!
  }
`;

export default typeDefs;
