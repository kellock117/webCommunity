import dotenv from "dotenv";

import typeDefs from "../graphql/typeDefs/post.typeDefs";
import resolvers from "../graphql/resolvers/post.resolver";
import {
  GQL_GET_POST_BY_PAGE,
  GQL_CREATE_POST,
  GQL_LIKE_POST,
  GQL_DELETE_POST,
} from "../constants/post";
import { init, close, createContextValue, run } from "./util";

dotenv.config();

beforeAll(async () => {
  await init({ typeDefs: typeDefs, resolvers: resolvers });
});

afterAll(async () => {
  await close();
});

describe("get posts by page", () => {
  const variables = {
    page: 1,
    lastPostId: "",
  };

  test("load first page", async () => {
    const {
      data: { getPostByPage },
    } = await run({
      query: GQL_GET_POST_BY_PAGE,
      variables: variables,
    });

    expect.assertions(1);
    // the number of post(s) should be at least 1
    expect(getPostByPage.length).toBeGreaterThanOrEqual(1);
  });

  test("check the order of posts whether it is lastest to oldest", async () => {
    const {
      data: { getPostByPage },
    } = await run({
      query: GQL_GET_POST_BY_PAGE,
      variables: variables,
    });

    expect.assertions(1);
    expect(Number(getPostByPage.at(1).time)).toBeGreaterThanOrEqual(
      Number(getPostByPage.at(-1).time)
    );
    // save the last post id to variables
    variables.lastPostId = getPostByPage.at(-1).id;
  });

  test("load second page", async () => {
    variables.page = 2;
    const {
      data: { getPostByPage },
    } = await run({
      query: GQL_GET_POST_BY_PAGE,
      variables: variables,
    });

    expect.assertions(2);
    // the post id must not be same with last post id
    expect(getPostByPage.at(-1).id).not.toBe(variables.lastPostId);
    // the number of post(s) should be at least 1
    expect(getPostByPage.length).toBeGreaterThanOrEqual(1);
  });

  test("load next page of last page", async () => {
    variables.lastPostId = "632d8818c8e7981ccbff55d6";
    const {
      data: { getPostByPage },
    } = await run({
      query: GQL_GET_POST_BY_PAGE,
      variables: variables,
    });

    expect.assertions(1);
    // the data should be empty
    expect(getPostByPage.length).toBe(0);
  });
});

describe("create post", () => {
  const variables = {
    title: "그대 떠나가는 그 순간도 나를 걱정 했었나요",
    content: "그대 나를 떠나간다고 해도 난 그댈 보낸 적 없죠",
  };

  test("create a new post with valid parameters", async () => {
    const {
      data: {
        createPost: { title, content, id },
      },
    } = await run({
      query: GQL_CREATE_POST,
      variables: variables,
    });

    expect.assertions(3);
    // check whether the return data is equal to the input variables
    expect(title).toBe(variables.title);
    expect(content).toBe(variables.content);

    // delete the post created
    const {
      data: { deletePost },
    } = await run({ query: GQL_DELETE_POST, variables: { postId: id } });

    expect(deletePost).toBe("Post deleted successfully");
  });

  test("create the post with invalid token", async () => {
    const {
      errors: [{ message }],
    } = await run({
      query: GQL_CREATE_POST,
      variables: variables,
      contextValue: createContextValue("Bearer a"),
    });

    expect.assertions(1);
    expect(message).toBe("Invalid/Expired token");
  });
});

describe("delete post", () => {
  test("delete post with invalid token", async () => {
    const {
      errors: [{ message }],
    } = await run({
      query: GQL_DELETE_POST,
      variables: { postId: "642c4dfa1aae59b7fed5b01c" },
      contextValue: createContextValue("Bearer a"),
    });

    expect.assertions(1);
    expect(message).toBe("Invalid/Expired token");
  });

  test("delete inexistent post", async () => {
    const {
      errors: [{ message }],
    } = await run({
      query: GQL_DELETE_POST,
      variables: { postId: "642c4dfa1aae59b7fed5b01c" },
    });

    expect.assertions(1);
    expect(message).toBe("Action not allowed");
  });

  test("delete other's post", async () => {
    const variables = {
      title: "그대 떠나가는 그 순간도 나를 걱정 했었나요",
      content: "그대 나를 떠나간다고 해도 난 그댈 보낸 적 없죠",
    };

    const {
      data: {
        createPost: { id },
      },
    } = await run({
      query: GQL_CREATE_POST,
      variables: variables,
      contextValue: createContextValue(process.env.LOGIN_TOKEN2),
    });

    const {
      errors: [{ message }],
    } = await run({
      query: GQL_DELETE_POST,
      variables: { postId: id },
    });

    expect.assertions(2);
    expect(message).toBe("Action not allowed");

    const {
      data: { deletePost },
    } = await run({
      query: GQL_DELETE_POST,
      variables: { postId: id },
      contextValue: createContextValue(process.env.LOGIN_TOKEN2),
    });

    expect(deletePost).toBe("Post deleted successfully");
  });
});

describe("like post", () => {
  test("hit the like button to the post with no like with valid token", async () => {
    const {
      data: { likePost },
    } = await run({
      query: GQL_LIKE_POST,
      variables: { postId: "632d8818c8e7981ccbff55d6" },
    });

    expect.assertions(1);
    expect(likePost).toBe("liked");
  });

  test("hit the like button to the post with like with valid token", async () => {
    const {
      data: { likePost },
    } = await run({
      query: GQL_LIKE_POST,
      variables: { postId: "632d8818c8e7981ccbff55d6" },
    });

    expect.assertions(1);
    expect(likePost).toBe("unliked");
  });

  test("hit the like button to inexistent post", async () => {
    const {
      errors: [{ message }],
    } = await run({
      query: GQL_LIKE_POST,
      variables: { postId: "632d8818c8e7981ccbff55d5" },
    });

    expect.assertions(1);
    expect(message).toBe("Post not found");
  });

  test("hit the like button with invalid token", async () => {
    const {
      errors: [{ message }],
    } = await run({
      query: GQL_LIKE_POST,
      variables: { postId: "632d8818c8e7981ccbff55d6" },
      contextValue: createContextValue("Bearer a"),
    });

    expect.assertions(1);
    expect(message).toBe("Invalid/Expired token");
  });
});
