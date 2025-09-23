const useFetch = () => {

  const customFetch = async (endpoint: string, options = {}) => {
    console.log("BASE_URL:", process.env.NEXT_PUBLIC_API_URL);
    
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL; //.env 파일의 변수 값 사용

    const defaultOptions: RequestInit = {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // 쿠키 전송
      cache: "no-cache",      // 항상 최신 데이터
    };
    const mergedOptions = { ...defaultOptions, ...options }; //기본 옵션과 선언한 옵션 합치기

    const response = await fetch(`${BASE_URL}${endpoint}`, mergedOptions);

    return response.json();  //json -> JS 객체 변환, json() 또 안써도 됨.
  };

  return customFetch;
};

export default useFetch;