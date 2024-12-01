import React from "react";
import { IconType } from "react-icons";

interface Props {
    onClick: () => void;
    isActive: boolean;
    categoryName: string;
    IconComponent?: IconType; // Haciendo que el icono sea opcional
}

function CategoryButton({
    onClick,
    isActive,
    IconComponent,
    categoryName,
}: Props) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`p-3 border rounded-lg flex flex-col items-center transition ${
                isActive
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
            }`}
        >
            {IconComponent && <IconComponent className="text-xl mb-1" />}{" "}
            {/* Renderizando el icono solo si existe */}
            <span className="text-xs text-center">{categoryName}</span>
        </button>
    );
}

export default CategoryButton;
