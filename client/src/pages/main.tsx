import React, { useState, useRef } from "react";
import { useQuery } from "@apollo/react-hooks";

import { postsValue } from "../context/postContext";
import { errorValue } from "../context/errorContext";
import NavBar from "../components/others/navbar.component";
import NewPost from "../components/post/newPost.component";
import PostList from "../components/post/postList.component";
import Error from "../components/others/error.component";
import { GQL_GET_POST_BY_PAGE } from "../constants/post";

import CircularProgress from "@mui/material/CircularProgress";

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

  if (loading) {
    return <CircularProgress style={{ marginLeft: "50%" }} />;
  }

  if (error) errorValue(error);

  const { getPostByPage } = data;
  postsValue(getPostByPage);

  return (
    <React.Fragment>
      <NavBar />
      {page === 1 ? <NewPost /> : null}
      <PostList
        page={page}
        lastPostId={lastPostId}
        nextPage={nextPage}
        previousPage={previousPage}
      />
      <Error />
    </React.Fragment>
  );
}
