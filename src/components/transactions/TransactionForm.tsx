import { Sidebar } from "../layout/Sidebar";
import { supabase } from "../../lib/supabase";
import { useState } from "react";
import { SYSTEM_CATEGORIES } from "../../types/categories";
import { categoryIcons } from "../../constants/categoryIcons";
import { ToggleButton, Input, CategoryButton, SubmitButton } from "../ui";
interface TransactionFormProps {
    // onTransactionAdded: () => void;
}

export default function Transactions({}: TransactionFormProps) {
    const [type, setType] = useState<"INCOME" | "EXPENSE">("EXPENSE");
    const [amount, setAmount] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");
    const [selectedDate, setSelectedDate] = useState<string>(
        new Date().toISOString().split("T")[0]
    );
    const [error, setError] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [description, setDescription] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const user = (await supabase.auth.getUser()).data.user;

        if (!user) {
            setError("Usuario no autenticado");
            return;
        }

        if (!amount || !selectedCategory) {
            setError("Por favor complete todos los campos requeridos");
            return;
        }

        setIsSaving(true);
        const { data, error: submitError } = await supabase
            .from("transactions")
            .insert([
                {
                    type: type.toLowerCase(),
                    amount: Number(amount),
                    category_id:
                        SYSTEM_CATEGORIES[
                            selectedCategory as keyof typeof SYSTEM_CATEGORIES
                        ].id,
                    subcategory_id: selectedSubcategory
                        ? Number(selectedSubcategory)
                        : null,
                    date: selectedDate,
                    user_id: user.id,
                    description,
                },
            ])
            .select();

        if (submitError) {
            console.error("Error detallado:", submitError);
            setError(`Error al guardar la transacción: ${submitError.message}`);
            setIsSaving(false);
            return;
        }

        // if (!submitError) {
        //   onTransactionAdded();
        // }

        // Limpiar el formulario
        setIsSaving(false);
        setAmount("");
        setSelectedCategory("");
        setSelectedSubcategory("");
        setDescription("");
        setError(null);
    };

    return (
        <div className="flex-1 p-6 md:p-10 w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-600">
                Nueva Transacción
            </h1>

            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <div className="grid grid-cols-2 gap-4">
                        <ToggleButton
                            isActive={type === "INCOME"}
                            onClick={() => setType("INCOME")}
                            type="INCOME"
                            text="Ingreso"
                        />
                        <ToggleButton
                            isActive={type === "EXPENSE"}
                            onClick={() => setType("EXPENSE")}
                            type="EXPENSE"
                            text="Gasto"
                        />
                    </div>
                </div>

                <div className="mb-6">
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-2xl text-gray-400">
                            $
                        </span>
                        <Input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0"
                            step="1"
                        />
                    </div>
                </div>

                <div className="text-xl mb-6">
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Descripción de la transacción"
                    />
                </div>

                <div className="mb-6">
                    <Input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    />
                </div>

                <div className="mb-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {Object.entries(SYSTEM_CATEGORIES).map(
                            ([key, category]) => {
                                const IconComponent =
                                    categoryIcons[
                                        key as keyof typeof categoryIcons
                                    ];

                                return (
                                    <CategoryButton
                                        key={key}
                                        onClick={() => setSelectedCategory(key)}
                                        isActive={selectedCategory === key}
                                        IconComponent={IconComponent}
                                        categoryName={category.name}
                                    />
                                );
                            }
                        )}
                    </div>
                </div>

                {selectedCategory && (
                    <div className="mb-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {SYSTEM_CATEGORIES[
                                selectedCategory as keyof typeof SYSTEM_CATEGORIES
                            ].subcategories.map((sub) => (
                                <CategoryButton
                                    key={sub.id}
                                    onClick={() =>
                                        setSelectedSubcategory(
                                            sub.id.toString()
                                        )
                                    }
                                    isActive={
                                        selectedSubcategory ===
                                        sub.id.toString()
                                    }
                                    categoryName={sub.name}
                                />
                            ))}
                        </div>
                    </div>
                )}

                <SubmitButton isSaving={isSaving} error={error} />
            </form>
        </div>
    );
}
