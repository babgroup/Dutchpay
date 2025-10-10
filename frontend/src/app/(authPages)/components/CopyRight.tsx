import Image from "next/image"
export default function CopyRight() {

  return (
    <a className="flex flex-col items-center gap-2 text-gray-500 text-xs mt-auto mb-20">
        <Image height={40} width={40} src="/babgroup.webp" alt="a github icon connected to github page" />
      @2025 Team Bab group
    </a>
  )
}