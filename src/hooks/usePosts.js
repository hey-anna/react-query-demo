// 커스텀 훅 만들기
// import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPost = () => {
  //   const id = queryData.queryKey[1];
  // return axios.get(`http://localhost:3004/posts/${postId}`);
  return axios.get(`http://localhost:3004/posts`); // 전체 데이터 가져오기
};

export const usePostQuery = () => {
  return useQuery({
    queryKey: ["posts"],
    // queryFn: (postId) => fetchPost(postId),
    queryFn: () => fetchPost(),
    // queryFn: fetchPost,
    retry: 1,
    select: (data) => {
      return data.data;
    },
  });
};
