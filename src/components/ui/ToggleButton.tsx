interface Props {
    isActive: boolean;
    onClick: () => void;
    type: "INCOME" | "EXPENSE";
    text: string;
}

function ToggleButton({ isActive, onClick, type, text }: Props) {
    const activeColor =
        type === "INCOME" ? "bg-green-500 text-white" : "bg-red-500 text-white";
    const inactiveColor =
        type === "INCOME"
            ? "bg-gray-200 hover:bg-gray-300"
            : "bg-gray-200 hover:bg-gray-300";

    return (
        <button
            type="button"
            onClick={onClick}
            className={`p-4 text-lg font-semibold rounded-lg transition ${
                isActive ? activeColor : inactiveColor
            }`}
        >
            {text}
        </button>
    );
}

export default ToggleButton;
