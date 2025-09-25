import { jwtDecode } from "jwt-decode";

export default function isTokenValid(token: string) {
  try {
    const decoded: { exp: number } = jwtDecode(token);
    const now = Date.now() / 1000; // 초 단위
    return decoded.exp > now; //현재 시간보다 유효기간이 더 길면 true
  } catch (error) {
    return false;
  }
}