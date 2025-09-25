const useFetch = () => {
  const customFetch = async (endpoint: string, options: RequestInit = {}) => {
    //RequestInit = {} : fetch의 두 번째 인자로 넣을 수 있는 옵션들 전부가 정의되어 있는 타입, 기본값으로 빈 객체

    const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;
    
    // local storage에서 토큰 가져오기
    const token = typeof window !== "undefined" ? localStorage.getItem("jwtToken") : null; 
    //브라우저(window)환경 일 때만 토큰 가져오기, 서버 렌더링 때 가져오게 되면 local storage라는 객체가 없어서 에러

    // fetch함수가 받을 수 있는 옵션 타입
    const defaultOptions: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}), // 토큰이 있으면 헤더에 토큰 객체 추가, 없으면 빈 객체
      },
      // credentials: "include",
      // cache: "no-cache",
    };

    const mergedOptions = { ...defaultOptions, ...options }; //기본 옵션과 선언한 옵션 합치기

    const response = await fetch(`${BASE_URL}${endpoint}`, mergedOptions);

    return response.json(); // json -> JS 객체 변환, json() 또 안써도 됨
  };

  return customFetch;
};

export default useFetch;