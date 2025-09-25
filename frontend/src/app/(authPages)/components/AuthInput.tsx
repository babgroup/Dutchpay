'use client';

import { FieldError, UseFormRegisterReturn } from "react-hook-form";
// FieldError 특정 인풋에 에러가 있는지 정보를 담은 라액트 훅 폼 기본 타입
// register() 함수가 반환하는 객체 타입, 이걸 input에 ...해서 form과 연결 하는 것

interface AuthInputProps {
  type: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  serverError?: boolean; // 조건부 렌더링(css)위해서 필요(로그인 에러 시 인풋 색상 변경)
}

export default function AuthInput({ type, placeholder, register, error, serverError }: AuthInputProps) {
  const hasError = error || serverError;

  return (
    <div className="flex flex-col w-3/4">
      <input
        type={type}
        placeholder={placeholder}
        {...register}
        className={`rounded-2xl h-[10vh] p-2 bg-gray-100 border border-2 focus:outline-none focus:ring-0 ${
          hasError ? "border-amber-600" : "border-gray-100"
        }`}
      />
      {error && <p className="text-amber-600">{error.message}</p>}
    </div>
  );
}