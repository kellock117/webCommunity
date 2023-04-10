import {
  GQL_GET_NOTIFICATIONS,
  GQL_MARK_AS_READ,
  GQL_DELETE_NOTIFICATIONS,
} from "../constants/notification";
import { GQL_CREATE_COMMENT, GQL_DELETE_COMMENT } from "../constants/comment";
import { init, run, anotherValidContextValue } from "./util";

beforeAll(async () => {
  await init({ port: 5004 });
});

describe("get notifications", () => {
  test("get notifications with valid context", async () => {
    const commentInput = {
      postId: "633ca749895ebd01a4604b04",
      content: "@Durianboi 포항항",
    };

    const {
      data: { createComment },
    } = await run({ query: GQL_CREATE_COMMENT, variables: commentInput });

    expect.assertions(3);
    expect(createComment.content).toBe("@Durianboi 포항항");

    const {
      data: { deleteComment },
    } = await run({
      query: GQL_DELETE_COMMENT,
      variables: { postId: commentInput.postId, commentId: createComment.id },
    });

    expect(deleteComment).toBe("Comment deleted successfully");

    const {
      data: { getNotifications },
    } = await run({
      query: GQL_GET_NOTIFICATIONS,
      contextValue: anotherValidContextValue,
    });

    expect(getNotifications.length).toBeGreaterThanOrEqual(1);
  });
});

describe("mark as read", () => {
  test("mark as read with valid context", async () => {
    const {
      data: { getNotifications },
    } = await run({
      query: GQL_GET_NOTIFICATIONS,
      contextValue: anotherValidContextValue,
    });

    const {
      data: { markAsRead },
    } = await run({
      query: GQL_MARK_AS_READ,
      variables: { notificationId: getNotifications.at(0).id },
    });

    expect(markAsRead).toBe("marked");
  });
});

describe("delete notifications", () => {
  test("delete notifications", async () => {
    let {
      data: { deleteNotifications },
    } = await run({
      query: GQL_DELETE_NOTIFICATIONS,
      contextValue: anotherValidContextValue,
    });

    expect.assertions(1);
    expect(deleteNotifications).toBe("Notifications deleted successfully");
  });
});
