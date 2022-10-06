import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import NavBar from "../components/others/navbar.component";
import NewPost from "../components/post/newPost.component";
import PostList from "../components/post/postList.component";

export default function Main() {
  const [page, setPage] = useState(1);
  const { data, loading, error } = useQuery(GQL_GET_POST_BY_PAGE, {
    variables: {
      page: page,
    },
  });
  const nextPage = () => {
    setPage(page + 1);
  };
  const previousPage = () => {
    setPage(page - 1);
  };

  return (
    <div>
      <NavBar />
      {page === 1 ? <NewPost /> : null}
      <PostList
        data={data}
        loading={loading}
        error={error}
        page={page}
        nextPage={nextPage}
        previousPage={previousPage}
      />
    </div>
  );
}

const GQL_GET_POST_BY_PAGE = gql`
  query GetPostByPage($page: Int!) {
    getPostByPage(page: $page) {
      id
      title
      userName
      content
      time
      likes
    }
  }
`;
