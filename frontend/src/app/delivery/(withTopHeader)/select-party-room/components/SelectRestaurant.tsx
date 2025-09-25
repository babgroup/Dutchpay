import BasicButton from "@/app/components/BasicButton";

interface SelectRestaurantProps {
    onBack: () => void;
    onNext: () => void;
}

export default function SelectRestaurant({ onBack, onNext }: SelectRestaurantProps) {
    return (
        <div className="flex flex-col h-full p-6">
            <BasicButton
                text="다음 단계로 이동"
                onClick={onNext}
            />
        </div>
    );
}