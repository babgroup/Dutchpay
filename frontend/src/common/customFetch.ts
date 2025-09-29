'use client';

const useCustomFetch = () => {
  
  const customFetch = async (endpoint: string, options: RequestInit = {}) => {
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;

    let token = typeof window !== "undefined" ? localStorage.getItem("jwtToken") : null;

    const publicEndpoints = ["/auth/login", "/user/signup", "/auth/refresh"]; // 하위 url에는 영향을 미치지 않도록 배열로 정확히 일치하느 값만 처리 하도록 관리
    const isPublicEndpoint = publicEndpoints.includes(endpoint);

    // 토큰 만료 5분 전 체크
    const isTokenExpiring = (token: string, minutesBefore = 5) => {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const expiry = payload.exp * 1000;
        return expiry - Date.now() < minutesBefore * 60 * 1000;
      } catch {
        return true;
      }
    };

    // 만료 전이면 리프레시 토큰으로 갱신
    if (token && isTokenExpiring(token, 5)) {
      try {
        const refreshRes = await fetch(`${BASE_URL}/auth/refresh`, {
          method: "POST",
          // credentials: "include", // cors 오류로 주석처리
        });
        const refreshData = await refreshRes.json();
        if (refreshRes.ok && refreshData.accessToken) {
          const newAccessToken = refreshData.accessToken;
          const newRefreshToken = refreshRes.headers.get("refresh-token"); //헤더에서 꺼냄
          localStorage.setItem("jwtToken", newAccessToken);

          // refresh token도 따로 저장
          if (newRefreshToken) {
            localStorage.setItem("refreshToken", newRefreshToken);
          }
          token = newAccessToken; 
        } else {
          localStorage.removeItem("jwtToken");
          throw new Error("세션이 만료되었습니다. 다시 로그인 해주세요.");
        }
        
      } catch {
        // 자동 로그아웃 처리 - 만료시간 될 때 까지 프론트에서 아무런 요청 X 일 경우(사용자의 움직임이 X) 
        localStorage.removeItem("jwtToken");
        alert("세션이 만료되었습니다. 다시 로그인해주세요.");
        window.location.href = ("/login");
        return {
          ok: false,
          status: 401,
          message: "세션 만료",
          data: null,
        };
      }
    }


    const defaultOptions: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...(!isPublicEndpoint && token
          ? { Authorization: `Bearer ${token}` }
          : {}),
      },
    };

    const mergedOptions = { ...defaultOptions, ...options };
    const res = await fetch(`${BASE_URL}${endpoint}`, mergedOptions);
    const data = await res.json();

    return {
      ok: res.ok,
      status: res.status,
      message: data.message,
      data: data.data || data,
    };
  };

  return customFetch;
};

export default useCustomFetch;

// 전체 흐름 정리 
// 	1.	로컬 스토리지에서 JWT 가져오기
// 	2.	만료 5분 전 체크 후 자동 갱신 (Refresh API 호출)
// 	- refresh 토큰 사용 성공 → 새 엑세스 토큰 및 리프레쉬 토큰 저장
// 	- 실패 → 로컬 토큰 삭제 + /login으로 강제 이동 + alert로 로그인 만료 표시
// 	3.	API 요청 보낼 때 Authorization 헤더 추가
// 	4.	응답을 {ok, status, message, data} 형태로 리턴