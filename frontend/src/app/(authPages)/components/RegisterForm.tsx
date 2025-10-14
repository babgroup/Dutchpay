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
  bankAccount: {
    bankName: string;
    accountNumber: string;
  };
};

export default function RegisterForm() {
  const apiFetch = useCustomFetch();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [serverError, setServerError] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>({
    defaultValues: { bankAccount: { bankName: "", accountNumber: "" } }
  });

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
      }
    } catch (error) {
      setServerError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full items-center mt-6">
      <AuthInput
        type="text"
        placeholder=" 이름"
        register={register("name", { required: "이름은 필수입니다." })}
        error={errors.name}
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
        error={errors.studentNumber}
        serverError={serverError}
      />
      <AuthInput
        type="email"
        placeholder=" EMAIL"
        register={register("email", { 
          required: "이메일은 필수입니다.",
          pattern: {
            value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
            message: "올바른 이메일 형식이어야 합니다."
          }
        })}
        error={errors.email}
        serverError={serverError}
      />
      <AuthInput
        type="password"
        placeholder=" PASSWORD"
        register={register("password", { 
          required: "비밀번호는 필수입니다.", 
          minLength: { value: 8, message: "비밀번호는 최소 8자 이상이어야 합니다." },
        })}
        error={errors.password}
        serverError={serverError}
      />
      <AuthInput
        type="text"
        placeholder=" 은행명 - '은행'을 제외하고 입력"
        register={register("bankAccount.bankName", { required: "은행명은 필수입니다." })}
        error={errors.bankAccount?.bankName}
        serverError={serverError}
      />
      <AuthInput
        type="text"
        placeholder=" 계좌번호"
        register={register("bankAccount.accountNumber", { 
          required: "계좌번호는 필수입니다.", 
          minLength: { value: 10, message: "유효한 계좌번호를 입력해주세요." },
        })}
        error={errors.bankAccount?.accountNumber}
        serverError={serverError}
      />
      
      {serverError && (
        <p className="text-amber-600 mt-1">모든 값을 작성해주세요.</p>
      )}

      <button 
        type="submit" 
        disabled={loading}
        className="bg-amber-500 text-white w-1/3 h-[6vh] rounded-xl py-[1.5vh]"
      >
        {loading ? "회원가입 중..." : "회원가입"}
      </button>

      <Link href="/login" className="text-sm text-gray-500 mb-20">
        로그인 하러가기
      </Link>
    </form>
  );
}