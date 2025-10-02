'use client';

import PartyContainer from "../../components/PartyContainer";

export default function MyPartyPage() {

  return (
      <div className="flex flex-col">
        <div className="overflow-scroll mb-auto max-h-2/3">
          <PartyContainer />
        </div>
      </div>
    )
  }