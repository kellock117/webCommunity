import {
  GQL_GET_COMMENTS,
  GQL_CREATE_COMMENT,
  GQL_LIKE_COMMENT,
  GQL_DELETE_COMMENT,
} from "../constants/comment";
import { GQL_GET_POST } from "../constants/post";
import { init, run, invalidContextValue } from "./util";

beforeAll(async () => {
  await init({ port: 5003 });
});

describe("get comments", () => {
  const durianboi = { postId: "633ca749895ebd01a4604b04" };

  test("get comments", async () => {
    const {
      data: { getComments },
    } = await run({ query: GQL_GET_COMMENTS, variables: durianboi });

    expect.assertions(1);
    expect(getComments.length).toBeGreaterThanOrEqual(1);
  });
});

describe("create comment", () => {
  const commentOnComing = {
    postId: "633d523919335e2b3cc23341",
    content: "포항항",
  };
  const commentOnInexistentPost = {
    postId: "63c80b22cd40e771275998aa",
    content: "포항항",
  };

  test("create comment on the post with valid context", async () => {
    const {
      data: { createComment },
    } = await run({
      query: GQL_CREATE_COMMENT,
      variables: commentOnComing,
    });

    expect.assertions(3);
    expect(createComment.content).toBe(commentOnComing.content);

    let {
      data: {
        getPost: { comments },
      },
    } = await run({
      query: GQL_GET_POST,
      variables: { postId: commentOnComing.postId },
    });
    const commentsLength = comments.length;

    // delete the comment
    const {
      data: { deleteComment },
    } = await run({
      query: GQL_DELETE_COMMENT,
      variables: {
        postId: commentOnComing.postId,
        commentId: createComment.id,
      },
    });

    ({
      data: [
        {
          getPost: { comments },
        },
      ],
    } = await run({
      query: GQL_GET_POST,
      variables: { postId: commentOnComing.postId },
    }));

    expect(deleteComment).toBe("Comment deleted successfully");
    expect(commentsLength).toBe(comments.length);
  });

  test("create comment with invalid context", async () => {
    const {
      errors: [{ message }],
    } = await run({
      query: GQL_CREATE_COMMENT,
      variables: commentOnComing,
      contextValue: invalidContextValue,
    });

    expect.assertions(1);
    expect(message).toBe("Invalid/Expired token");
  });

  test("create comment on inexistent post", async () => {
    const {
      errors: [{ message }],
    } = await run({
      query: GQL_CREATE_COMMENT,
      variables: commentOnInexistentPost,
    });

    expect.assertions(1);
    expect(message).toBe("Post not found");
  });
});

describe("delete comment", () => {
  // Aaa's comment, Hello
  const commentOfOther = {
    postId: "633d41248a43702b3dc71fb2",
    commentId: "633d412c8a43702b3dc71fb6",
  };
  const inexistentComment = {
    postId: "633d41248a43702b3dc71fb2",
    commentId: "63c80d8b84d40f2fceaa3209",
  };

  test("delete comment with invalid token", async () => {
    const {
      errors: [{ message }],
    } = await run({
      query: GQL_DELETE_COMMENT,
      variables: commentOfOther,
      contextValue: invalidContextValue,
    });

    expect.assertions(1);
    expect(message).toBe("Invalid/Expired token");
  });

  test("delete inexistent comment", async () => {
    const {
      errors: [{ message }],
    } = await run({
      query: GQL_DELETE_COMMENT,
      variables: inexistentComment,
    });

    expect.assertions(1);
    expect(message).toBe("Comment not found");
  });

  test("delete other's comment", async () => {
    const {
      errors: [{ message }],
    } = await run({
      query: GQL_DELETE_COMMENT,
      variables: commentOfOther,
    });

    expect.assertions(1);
    expect(message).toBe("Action not allowed");
  });
});

describe("like comment", () => {
  const thanks = { commentId: "643389e51c51ad6ac3446365" };
  const inexistentComment = { commentId: "642d3f5ae5756e00e62ccaa8" };

  test("hit the like button to the comment with no like with valid token", async () => {
    const {
      data: { likeComment },
    } = await run({
      query: GQL_LIKE_COMMENT,
      variables: thanks,
    });

    expect.assertions(1);
    expect(likeComment).toBe("liked");
  });

  test("hit the like button to the comment with like with valid token", async () => {
    const {
      data: { likeComment },
    } = await run({
      query: GQL_LIKE_COMMENT,
      variables: thanks,
    });

    expect.assertions(1);
    expect(likeComment).toBe("unliked");
  });

  test("hit the like button to inexistent comment", async () => {
    const {
      errors: [{ message }],
    } = await run({
      query: GQL_LIKE_COMMENT,
      variables: inexistentComment,
    });

    expect.assertions(1);
    expect(message).toBe("Comment not found");
  });

  test("hit the like button with invalid token", async () => {
    const {
      errors: [{ message }],
    } = await run({
      query: GQL_LIKE_COMMENT,
      variables: inexistentComment,
      contextValue: invalidContextValue,
    });

    expect.assertions(1);
    expect(message).toBe("Invalid/Expired token");
  });
});
