import { FC, useState } from "react";
import { IconType } from "react-icons";
import { categoryIcons } from "../../constants/categoryIcons";
import { getCategoryKeyByIdValue } from "../../types/categories";
import { FaTrash } from "react-icons/fa";
import DeleteTransactionModal from "./deleteTransactionModal";

interface TransactionItemProps {
    type: "income" | "expense";
    amount: number;
    description: string;
    categoryId: number;
    subcategory: string;
    date: string;
    icon?: IconType;
    onDelete: () => void;
}
const TransactionItem: FC<TransactionItemProps> = ({
    type,
    amount,
    description,
    categoryId,
    subcategory,
    date,
    icon: IconComponent = categoryIcons[
        getCategoryKeyByIdValue(categoryId) || "DEFAULT"
    ] || categoryIcons.DEFAULT,
    onDelete,
}) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const isIncome = type === "income";

    const handleDeleteClick = () => {
        setShowConfirm(true);
    };

    const confirmDelete = () => {
        onDelete();
        setShowConfirm(false);
    };

    const cancelDelete = () => {
        setShowConfirm(false);
    };

    return (
        <div className="flex items-center justify-between p-4 mb-2 rounded-lg hover:shadow-md transition-shadow relative group">
            <div className="flex items-center gap-4">
                <div
                    className={`p-3 rounded-full ${
                        isIncome ? "bg-green-100" : "bg-red-100"
                    }`}
                >
                    <IconComponent className="text-lg md:text-xl mb-1" />
                </div>

                <div>
                    <h3 className="font-medium text-gray-800">{description}</h3>
                    <p className="text-sm text-gray-500">{subcategory}</p>
                </div>
            </div>

            <div className="text-right flex-1">
                <p
                    className={`font-semibold ${
                        isIncome ? "text-green-600" : "text-red-600"
                    }`}
                >
                    {isIncome ? "+" : "-"}${Math.abs(amount).toLocaleString('es-ES')}
                </p>
                <p className="text-sm text-gray-500">
                    {new Date(date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}
                </p>
            </div>

            <button
                onClick={handleDeleteClick}
                className="ml-4 text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity absolute right-4"
            >
                <FaTrash />
            </button>

            {showConfirm && (
                <DeleteTransactionModal
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                />
            )}
        </div>
    );
};

export default TransactionItem;
