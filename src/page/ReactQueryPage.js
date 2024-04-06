import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export const ReactQueryPage = () => {
  // 옛날 매개변수를 다따로받음
  // 최신버전은 매개변수를 하나로 합쳐서 하나의 오브젝트 객체 하나로 받는다.
  // queryKey 내가 api호출하는것의 각각 호출(쿼리)에 이름을 지정
  // !! 중요 각각의 이름이 유니크한이름이어야 한다.

  const fetchPost = () => {
    return axios.get("http://localhost:3004/posts");

    // // 에러 테스트
    // return axios.get("http://localhost:3004/post");
  };

  // 유즈쿼맇 훅
  // 유즈 쿼리는 컴포넌트 시작할 때 실행된다.
  // (컴포넌트 들어오자 마자, 마운트, 싱행되는구나)
  // 컴포넌트 바로 시작하고 싶지않다. 버튼 클릭할때 시작하고 싶은경우도 설정할 수있다.

  // 기본 재시도 횟수 3번, 이횟수도 설정가능 (한번은 내가 + 실패 시 3번 더 = 총 4회)
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["posts"], // 모든 포스트를 가져온다해서 포스트츠라고 이름 지음 - 이 api 이르은 posts 다
    queryFn: fetchPost,
    retry: 1, // 한번만 더 시도하게 세팅
    // queryFn: () => {
    //   return axios.get("http://localhost:3004/posts");
    // }, // 내가 호출하고 싶은 api
    select: (data) => {
      return data.data;
    },
  });
  console.log("## 데이타", data, isLoading);
  console.log("error", isError, error);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }
  return (
    <div>
      {data.map((item) => (
        <div>{item.title}</div>
      ))}
    </div>
    // <div>
    //   {data.data.map((item) => (
    //     <div>{item.title}</div>
    //   ))}
    // </div>
  );
};

// 이름 정해주고, 무슨 api인지 딱 말해주면, queryKey가 알아서 뾰로롱 탁하고 부르게 됨
