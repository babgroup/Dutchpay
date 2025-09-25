'use client';

import useFetch from "@/common/customFetch";
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
  const Fetch = useFetch();
  const router = useRouter();
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [serverError, setServerError] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {

    try {
      setServerError(false);
      setLoading(true);
      const response = await Fetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (response.accessToken) {
        localStorage.setItem("jwtToken", response.accessToken); //토큰값 받았을 경우(로그인 성공) 로컬스토리지에 저장
        await router.push("/");
      } else {
        setServerError(true);
        return;
      }
    } catch (error) {
      setServerError(true);
      if (error instanceof Error) setMessage(`로그인 실패: ${error.message}`);
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
      {errors.password && <p>{errors.password.message}</p>}

      {(serverError) && (
        <p className="text-amber-600">이메일 혹은 비밀번호를 확인 해주세요.</p>
      )}
      {message && <p>{message}</p>}

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