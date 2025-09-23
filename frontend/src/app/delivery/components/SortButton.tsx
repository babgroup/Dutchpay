import Image from "next/image";

export type SortingOption = "최신순" | "종료일순" | "가게이름순";

interface SortButtonProps {
  sortingOption: SortingOption;
  setSortingOption: (option: SortingOption) => void;
}

export default function SortButton({ sortingOption, setSortingOption }: SortButtonProps) {
  const handleChangeOption = () => {
    if (sortingOption === '최신순') {
      setSortingOption('종료일순');
    } else if (sortingOption === '종료일순') {
      setSortingOption('가게이름순');
    } else {
      setSortingOption('최신순');
    }
  };

  return (
    <button onClick={handleChangeOption}   className="self-start flex justify-start items-center w-3.5/12 bg-gray-200 rounded-2xl px-3 py-1 ml-14 mt-2 mb-3 text-sm text-center">
      <Image src="/angle-small-down.svg" alt="sorting button" width={10} height={10} />
      <span className="ml-2" >{sortingOption}</span>
    </button>
  );
}