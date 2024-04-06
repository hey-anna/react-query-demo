import { useQueries, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { usePostQuery } from "../hooks/usePosts";
// import usePostQuery

export const ReactManyQueryPage = () => {
  const ids = [1, 2, 3, 4];

  const fetchPostDetail = (id) => {
    return axios.get(`http://localhost:3004/posts/${id}`);
  };

  const results = useQueries({
    // 연속적으로 부를 때 필요
    // 그냥 useQuery 여러개 불러도 상관없다. >> 기본적으로 여러개 부르면 병렬로 실행하게 된다. >> 비동기로 한번에 쫘라락 실행하게되는(순차적으로 실행하는게 아니라)

    queries: ids.map((id) => {
      return {
        queryKey: ["posts", id],
        queryFn: () => fetchPostDetail(id),
      };
    }),
    // queries array 배열로 들어오기 때문에
    // 가져오고 싶은것을 combine해서 가져올 수 잇다.
    combine: (results) => {
      return {
        // data: results.map((result) => result.data),
        data: results.map((result) => result.data?.data),
      };
    },
  });
  console.log("##results", results);
  return <div>ddd</div>;
};
