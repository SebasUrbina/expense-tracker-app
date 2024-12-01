import { FC } from "react";

interface DeleteTransactionModalProps {
    onConfirm: () => void;
    onCancel: () => void;
}

const DeleteTransactionModal: FC<DeleteTransactionModalProps> = ({ onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 scale-100 hover:scale-105">
                <h2 className="text-lg font-semibold text-gray-800">Confirmar Eliminación</h2>
                <p className="mt-2 text-gray-600">¿Estás seguro de que deseas eliminar esta transacción?</p>
                <div className="flex justify-end mt-6">
                    <button
                        onClick={onCancel}
                        className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-200"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteTransactionModal;