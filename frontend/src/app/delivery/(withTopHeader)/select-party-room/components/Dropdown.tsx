'use client';

import { useState, useEffect, useRef } from 'react';

export interface DropdownOption {
  value: string; // 내부적으로 사용
  label: string; // 사용자에게 보여주는 값
}

interface SelectDropdownProps {
  label: string;
  placeholder: string;
  options: DropdownOption[];
  selectedValue: string | null; // 현재 선택된 값 (부모 컴포넌트에서 관리)
  onSelect: (value: string) => void; // 옵션을 선택했을 때 부모에게 알려줄 함수
  disabled? : boolean;
}

export default function SelectDropdown({
  label,
  placeholder,
  options,
  selectedValue,
  onSelect,
  disabled = false,
}: SelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // 현재 선택된 값에 해당하는 라벨
  const selectedLabel = options.find((option) => option.value === selectedValue)?.label || placeholder;

  const handleSelectOption = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative w-full">
      <label className="block pl-2 text-sm font-medium text-gray-700 mb-1">{label}</label>
      
      {/* 드롭다운 버튼 */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-left text-sm hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-orange-100 focus:border-orange-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
      >
        <span className={`truncate ${selectedValue ? 'text-gray-900' : 'text-gray-500'} ${disabled ? 'text-gray-400' : ''}`}>
          {selectedLabel}
        </span>
        <svg
          className={`h-5 w-5 text-gray-400 transform transition-transform ${isOpen ? '-rotate-180' : 'rotate-0'}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {/* 드롭다운 메뉴 */}
      {isOpen && !disabled && (
        <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <ul className="max-h-60 overflow-auto rounded-md py-1 text-base focus:outline-none sm:text-sm">
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelectOption(option.value)}
                className="cursor-pointer select-none relative py-2 pl-3 pr-9 text-gray-900 hover:bg-orange-100"
              >
                <span className="block truncate">{option.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}