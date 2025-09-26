'use client';

import { useForm } from "react-hook-form";
import useCustomFetch from "@/common/customFetch";
import AuthInput from "./AuthInput";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

type RegisterFormInputs = {
  email: string;
  name: string;
  studentNumber: number;
  password: string;
}; //form 에 사용할 데이터 타입

export default function RegisterForm() {
  const apiFetch = useCustomFetch();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [serverError, setServerError] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>();

  const onSubmit = async (data: RegisterFormInputs) => {
    setServerError(false);
    setLoading(true);
    try {
    const response = await apiFetch("/user/signup", {
        method: "POST",
        body: JSON.stringify(data),
      });
    if (response.ok) {
        await router.push("/login");
      } else {
        setServerError(true);
        return;
      }
    } catch (error) {
      setServerError(true);
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full items-center h-[50vh] mt-6">
      <AuthInput
        type="name"
        placeholder=" 이름"
        register={register("name", { required: "이름은 필수입니다." })}
        error={errors.name} //validation 에러
        serverError={serverError}
      />
      <AuthInput
        type="number"
        placeholder=" 학번"
        register={register("studentNumber", { 
          required: "학번은 필수입니다.", 
          minLength: { value: 7, message: "학번은 7자리여야 합니다." },
          maxLength: { value: 7, message: "학번은 7자리여야 합니다." },
        })}
        error={errors.studentNumber} //validation 에러
        serverError={serverError}
      />
      <AuthInput
        type="email"
        placeholder=" EMAIL"
        register={register("email", { required: "이메일은 필수입니다."})}
        error={errors.email} //validation 에러
        serverError={serverError}
      />
      <AuthInput
        type="password"
        placeholder=" PASSWORD"
        register={register("password", { 
          required: "비밀번호는 필수입니다.", 
          minLength: { value: 8, message: "비밀번호는 최소 8자 이상이어야 합니다." },
        })}
        error={errors.password} //validation 에러
        serverError={serverError}
      />

      {(serverError) && (
        <p className="text-amber-600 mt-1">모든 값을 작성해주세요.</p> //Error가 캐치 되면 여기에 에러메세지 표시
      )}

      <button type="submit" disabled={loading}
        className="bg-amber-500 text-white w-1/3 h-[10vh] rounded-xl py-[1.5vh]">
        {loading ? "회원가입 중..." : "회원가입"}
      </button>

      <Link href="/login" className="text-sm text-gray-500">
        로그인 하러가기
      </Link>
    </form>
  )
}