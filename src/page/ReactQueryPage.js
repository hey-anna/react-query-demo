import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { usePostQuery } from "../hooks/usePosts";
// import usePostQuery

export const ReactQueryPage = () => {
  // 옛날 매개변수를 다따로받음
  // 최신버전은 매개변수를 하나로 합쳐서 하나의 오브젝트 객체 하나로 받는다.
  // queryKey 내가 api호출하는것의 각각 호출(쿼리)에 이름을 지정
  // !! 중요 각각의 이름이 유니크한이름이어야 한다.

  //   const fetchPost = (queryData) => {
  //     // console.log("## queryFn", queryData);
  //     const id = queryData.queryKey[1];
  //     return axios.get(`http://localhost:3004/posts/${id}`);

  //     // // 에러 테스트
  //     // return axios.get("http://localhost:3004/post");
  //   };

  //   // 유즈쿼맇 훅
  //   // 유즈 쿼리는 컴포넌트 시작할 때 실행된다.
  //   // (컴포넌트 들어오자 마자, 마운트, 싱행되는구나)
  //   // 컴포넌트 바로 시작하고 싶지않다. 버튼 클릭할때 시작하고 싶은경우도 설정할 수있다.

  //   // 기본 재시도 횟수 3번, 이횟수도 설정가능 (한번은 내가 + 실패 시 3번 더 = 총 4회)
  //   const { isLoading, data, isError, error, refetch } = useQuery({
  //     // 모든 포스트를 가져온다해서 포스트츠라고 이름 지음 - 이 api 이르은 posts 다
  //     // queryKey: ["posts"],

  //     // 1의 데이터를 가지고 오고싶은경우 > 매개변수에서 받아올 수 있다
  //     //queryData 참고로 이친구는 queryFn에서 받아온다
  //     // 디테일한 데이터를 가져오고 싶은 경우? 매개변수를 두번째에 넘겨 줄 수 있다. 세번째, 네번째, 다섯번째에도 넘어갈 수있구요.
  //     queryKey: ["posts", 1], // 쿼리키는 항상 유니크해야한다.
  //     // queryKey: ["posts", {id:1}], // 이렇게 줘도 상관없다.

  //     queryFn: fetchPost,
  //     retry: 1, // 한번만 더 시도하게 세팅
  //     // queryFn: () => {
  //     //   return axios.get("http://localhost:3004/posts");
  //     // }, // 내가 호출하고 싶은 api

  //     select: (data) => {
  //       return data.data;
  //     },

  //     // // !! staleTime < gcTime
  //     // staleTime: 60000, // 내가 호출하고 싶을때 api를 호출할수 있다 // 기본값은 0 // 한번호출하면 땡치는 api에 많이 사용
  //     // // 캐시 타임 조절(갈비지컬렉트타임, 쓰레기걸러지는시간?)
  //     // gcTime: 10000, // 5초가 지나면 캐시를 비워버리게 세팅 < V5 > cacheTime (하위버전 ) > 설정하지않으면 기본값은 5분

  //     // refetchInterval: 3000, // api 호출을 3초마다 하고싶다
  //     // refetchOnMount: false, // 내가 컴포넌트 들어와도 패치가 안되게 설정 // 컴포넌트 시작할때 패치되게 할거냐 말거냐(다시들어갈때) // true는 매번 호출 = 기본값은 true
  //     // refetchOnWindowFocus: true, // 화면 들어가면 window에 포커스되면 자동으로 리프레쉬 되게 // 유저가 항상 최신 데이터를 볼 수 있음 // 유저한테 새로운 데이터를 빨리빨리 보여줘야할때 사용하면 좋다.

  //     // enabled: false, // 초기에 호출되지 않음 // 기본값은 true
  //     // enabled: keyword // 키워드가 있으면 검색하는 조건문을 만든다든지
  //     // enabled: !!keyword // 키워드가 없으면 api 호출을 안한다든지
  //   });

  // 유즈 커스텀 훅 만들기
  // usePostQuery(postId)
  const { data, isLoading, isError, error, refetch } = usePostQuery();
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
      {/* 데이터가 있을 때만 */}
      {data?.map((item) => (
        <div>{item.title}</div>
      ))}
      <button onClick={refetch}>post리스트 다시 들고오기</button>
    </div>
    // <div>
    //   {data.data.map((item) => (
    //     <div>{item.title}</div>
    //   ))}
    // </div>
  );
};

// 이름 정해주고, 무슨 api인지 딱 말해주면, queryKey가 알아서 뾰로롱 탁하고 부르게 됨

// * 조절 가능
// 3초에 한번씩 호출
// 내가 윈도우 돌아왔을때 호출하고 싶다 다 조절 가능
// api 통제가 중요한 이유, 실제서버에 부하를 주기 때문에 통제가 중요
// 실제 서버에 부담주는에는 api 호출 임 > api호출 쓸데없이 많이되면 성능에 안좋다. > 큰영양 준다. > api 호출, 얼마나 자주하는지, 얼마나 아껴하는지 중요하다.
