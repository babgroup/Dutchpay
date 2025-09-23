import React from "react";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export default function SearchBar({ searchTerm, setSearchTerm }: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder="식당 이름 검색..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="flex border border-gray-300 rounded-2xl p-2 w-5/7 items-center  mb-4 text-md "
    />
  );
}