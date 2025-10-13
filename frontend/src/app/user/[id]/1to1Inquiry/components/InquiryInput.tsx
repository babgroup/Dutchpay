'use client';

interface InquiryInputProps {
    label: string;
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
}

export default function InquiryInput({
    label,
    placeholder = '',
    value = '',
    onChange,
}: InquiryInputProps) {
    return (
        <div className="mt-6 w-full">
            <label className="block pl-2 text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <textarea
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                placeholder={placeholder}
                rows={6}
                className="w-full resize-none rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-100 focus:border-orange-500"
            />
        </div>
    );
}