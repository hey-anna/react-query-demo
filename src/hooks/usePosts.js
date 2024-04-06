// 커스텀 훅 만들기
// import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPost = (postId) => {
  //   const id = queryData.queryKey[1];
  return axios.get(`http://localhost:3004/posts/${postId}`);
};

export const usePostQuery = (postId) => {
  return useQuery({
    queryKey: ["posts", postId],
    // queryFn: (postId) => fetchPost(postId),
    queryFn: () => fetchPost(postId),
    // queryFn: fetchPost,
    retry: 1,
    select: (data) => {
      return data.data;
    },
  });
};
