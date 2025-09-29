'use client';

import Link from "next/link";
import PartyContainer from "../../components/PartyContainer";

export default function MyPartyPage() {

  return (
      <div className="flex flex-col">
        <div className="overflow-scroll mb-auto max-h-2/3">
          <PartyContainer />
        </div>
        <div className="w-full flex flex-col items-center p-4">
          <Link className="mt-2 text-gray-300" href="파티해산하기"> {/* href 변경 필요 */}
            파티 해산하기
          </Link>
        </div>
      </div>
    )
  }