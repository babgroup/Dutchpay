type PartyTypeCardProps = {
  text: string;
  isSelected: boolean;
  onClick: () => void;
};

export default function PartyTypeCard({
  text,
  isSelected,
  onClick,
}: PartyTypeCardProps) {
  return (
    <div
      className={`p-10 rounded-2xl border-2 text-center cursor-pointer transition-colors
        ${
          isSelected
            ? 'bg-orange-50 border-orange-400 font-semibold text-orange-600'
            : 'border-gray-200 text-gray-700 hover:border-gray-400'
        }`}
      onClick={onClick}
    >
      {text}
    </div>
  );
}