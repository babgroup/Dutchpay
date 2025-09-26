const useCustomFetch = () => {
  const customFetch = async (endpoint: string, options: RequestInit = {}) => {
    //RequestInit = {} : fetch의 두 번째 인자로 넣을 수 있는 옵션들 전부가 정의되어 있는 타입, 기본값으로 빈 객체

    const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string; //.env 파일의 변수 값 사용
    
    // local storage에서 토큰 가져오기
    const token = typeof window !== "undefined" ? localStorage.getItem("jwtToken") : null; 
    //브라우저(window)환경 일 때만 토큰 가져오기, 서버 렌더링 때 가져오게 되면 local storage라는 객체가 없어서 에러

    // fetch함수가 받을 수 있는 옵션 타입
    const defaultOptions: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...(token && endpoint !== "/auth/login" ? { Authorization: `Bearer ${token}` } : {}), // 토큰이 있으면 헤더에 토큰 객체 추가, 없으면 빈 객체
      },
      // credentials: "include", // 쿠키 전송
      // cache: "no-cache",      // 항상 최신 데이터 CORS오류 때문에 주석
    };

    const mergedOptions = { ...defaultOptions, ...options }; //기본 옵션과 선언한 옵션 합치기

    const response = await fetch(`${BASE_URL}${endpoint}`, mergedOptions);

    const result = await response.json();

    return {
      ok: response.ok, // 200~299면 true, 아니면 false
      status: response.status, // 401, 400 등 요청 에러
      message: result.message, // 서버 메시지
      data: result.data || result // 실제 데이터, /auth/login api 처럼 data 객체 없이 바로 result 나올 경우를 위해
    }      
  };
  return customFetch;

};

export default useCustomFetch;
