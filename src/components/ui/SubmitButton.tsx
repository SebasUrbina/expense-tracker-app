import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isSaving: boolean;
    error: string | null;
}

function SubmitButton({ isSaving, error, ...props }: Props) {
    return (
        <>
            {error && (
                <div className="mb-4 text-red-500 font-bold">{error}</div>
            )}
            <button
                {...props}
                disabled={isSaving}
                className={`w-full text-white p-3 rounded-lg font-semibold text-base transition ${
                    isSaving
                        ? "bg-blue-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600"
                }`}
            >
                {isSaving ? "Guardando..." : "Guardar Transacción"}
            </button>
        </>
    );
}

export default SubmitButton;
