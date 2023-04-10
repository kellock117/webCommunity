import React, { useState, useRef, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";

import { postsValue } from "../context/postContext";

import NavBar from "../components/others/navbar.component";
import NewPost from "../components/post/newPost.component";
import PostList from "../components/post/postList.component";
import { GQL_GET_POST_BY_PAGE } from "../constants/post";

export default function Main() {
  const [page, setPage] = useState<number>(1);
  const lastPostId = useRef<string>("");

  const { data, loading, error } = useQuery(GQL_GET_POST_BY_PAGE, {
    variables: {
      page: page,
      lastPostId: lastPostId.current,
    },
  });

  const nextPage = () => {
    setPage(page + 1);
  };
  const previousPage = () => {
    setPage(page - 1);
  };

  useEffect(() => {
    postsValue(data?.getPostByPage);
  }, [data]);

  return (
    <div>
      <NavBar />
      {page === 1 ? <NewPost /> : null}
      <PostList
        loading={loading}
        error={error}
        page={page}
        lastPostId={lastPostId}
        nextPage={nextPage}
        previousPage={previousPage}
      />
    </div>
  );
}
