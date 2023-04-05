import dotenv from "dotenv";

import typeDefs from "../graphql/typeDefs/comment.typeDefs";
import resolvers from "../graphql/resolvers/comment.resolver";
import {
  GQL_GET_COMMENTS,
  GQL_CREATE_COMMENT,
  GQL_LIKE_COMMENT,
  GQL_DELETE_COMMENT,
} from "../constants/comment";
import { init, close, validContextValue, run } from "./util";

dotenv.config();

beforeAll(async () => {
  await init({ typeDefs: typeDefs, resolvers: resolvers, port: 5003 });
});

afterAll(async () => {
  await close();
});

describe("get comments", () => {
  const variables = { postId: "63c80b22cd40e7712759981a" };

  test("get comments", async () => {
    const {
      data: { getComments },
    } = await run({ query: GQL_GET_COMMENTS, variables: variables });

    expect.assertions(1);
    expect(getComments.length).toBeGreaterThanOrEqual(1);
  });
});

describe("create comment", () => {
  const variables = { postId: "63c80b22cd40e7712759981a", content: "포항항" };

  test("create comment on the post with valid context", async () => {
    const {
      data: { createComment },
    } = await run({
      query: GQL_CREATE_COMMENT,
      variables: variables,
    });

    expect.assertions(2);
    expect(createComment.content).toBe(variables.content);

    // delete the comment
    const {
      data: { deleteComment },
    } = await run({
      query: GQL_DELETE_COMMENT,
      variables: { commentId: createComment.id },
    });

    expect(deleteComment).toBe("Comment deleted successfully");
  });

  test("create comment with invalid context", async () => {
    const {
      errors: [{ message }],
    } = await run({
      query: GQL_CREATE_COMMENT,
      variables: variables,
      contextValue: validContextValue(false),
    });

    expect.assertions(1);
    expect(message).toBe("Invalid/Expired token");
  });

  test("create comment on inexistent post", async () => {
    const {
      errors: [{ message }],
    } = await run({
      query: GQL_CREATE_COMMENT,
      variables: { postId: "63c80b22cd40e771275998aa", content: "포항항" },
    });

    expect.assertions(1);
    expect(message).toBe("Post not found");
  });
});

describe("delete comment", () => {
  const variables = { commentId: "63c80d8b84d40f2fceaa3209" };
  test("delete comment with invalid token", async () => {
    const {
      errors: [{ message }],
    } = await run({
      query: GQL_DELETE_COMMENT,
      variables: variables,
      contextValue: validContextValue(false),
    });

    expect.assertions(1);
    expect(message).toBe("Invalid/Expired token");
  });

  test("delete inexistent comment", async () => {
    const {
      errors: [{ message }],
    } = await run({
      query: GQL_DELETE_COMMENT,
      variables: { commentId: "642c4dfa1aae59b7fed5b01d" },
    });

    expect.assertions(1);
    expect(message).toBe("Comment not found");
  });

  test("delete other's comment", async () => {
    const {
      errors: [{ message }],
    } = await run({
      query: GQL_DELETE_COMMENT,
      variables: variables,
    });

    expect.assertions(1);
    expect(message).toBe("Action not allowed");
  });
});

describe("like comment", () => {
  const variables = { commentId: "642d3f5ae5756e00e62ccaa7" };
  test("hit the like button to the comment with no like with valid token", async () => {
    const {
      data: { likeComment },
    } = await run({
      query: GQL_LIKE_COMMENT,
      variables: variables,
    });

    expect.assertions(1);
    expect(likeComment).toBe("liked");
  });

  test("hit the like button to the comment with like with valid token", async () => {
    const {
      data: { likeComment },
    } = await run({
      query: GQL_LIKE_COMMENT,
      variables: variables,
    });

    expect.assertions(1);
    expect(likeComment).toBe("unliked");
  });

  test("hit the like button to inexistent comment", async () => {
    const {
      errors: [{ message }],
    } = await run({
      query: GQL_LIKE_COMMENT,
      variables: { commentId: "642d3f5ae5756e00e62ccaa8" },
    });

    expect.assertions(1);
    expect(message).toBe("Comment not found");
  });

  test("hit the like button with invalid token", async () => {
    const {
      errors: [{ message }],
    } = await run({
      query: GQL_LIKE_COMMENT,
      variables: variables,
      contextValue: validContextValue(false),
    });

    expect.assertions(1);
    expect(message).toBe("Invalid/Expired token");
  });
});
