import Link from "next/link";

export default function PlusButton() {

  return (
    <div className="bg-white border-amber-500" >
      <Link href="/delivery/create-room" />
    </div>
  );
}