'use client';

import useCustomFetch from "@/common/customFetch";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";
import AuthInput from "./AuthInput";
import { useRouter } from "next/navigation";

type LoginFormInputs = {
  email: string;
  password: string;
}; //form 에 사용할 데이터 타입

export default function LoginForm() {
  const Fetch = useCustomFetch();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [serverError, setServerError] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      setServerError(false);
      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();
      const refreshToken = res.headers.get("refresh-token");

      if (res.ok && responseData.accessToken) {
        localStorage.setItem("jwtToken", responseData.accessToken);
        if (refreshToken) localStorage.setItem("refreshToken", refreshToken); // 리프레쉬 토큰도 로컬스토리지에 저장
        await router.push("/");
      } else {
        setServerError(true);
      }
    } catch (error) {
      setServerError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full items-center h-[50vh] mt-6">
      <AuthInput
        type="email"
        placeholder=" EMAIL"
        register={register("email", { required: "이메일은 필수입니다." })}
        error={errors.email} //validation 에러
        serverError={serverError}
      />
      <AuthInput
        type="password"
        placeholder=" PASSWORD"
        register={register("password", { required: "비밀번호는 필수입니다." })}
        error={errors.password} //validation 에러
        serverError={serverError}
      />

      {(serverError) && (
        <p className="text-amber-600 mt-1">이메일 혹은 비밀번호를 확인 해주세요.</p> //Error가 캐치 되면 여기에 에러메세지 표시
      )}

      <button type="submit" disabled={loading}
        className="bg-amber-500 text-white w-1/3 h-[6vh] rounded-xl">
        {loading ? "로그인 중..." : "로그인"}
      </button>

      <Link href="/register" className="text-sm text-gray-500">
        회원가입 하러가기
      </Link>
    </form>
  );
}