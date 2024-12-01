import { FC, useState, useEffect } from "react";
import TransactionItem from "./TransactionItem";
import LoadingSpinner from "../shared/Loading";
import { getLatestTransactions } from "../../services/transactionService";
import { Tables } from "../../types/database.types";
import { deleteTransactions } from "../../services/transactionService";
import { supabase } from "../../lib/supabase";
const TransactionList: FC = () => {
    const [transactions, setTransactions] = useState<Tables<"transactions">[]>(
        []
    );
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Obtener datos de supabasetransactions
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const data = await getLatestTransactions(); // Llamar a la función del servicio
                setTransactions(data || []);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTransactions();

        // Realtime updates
        supabase
            .channel("transactions")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "transactions",
                },
                (payload) => {
                    fetchTransactions();
                    console.log("Change received");
                }
            )
            .subscribe();
    }, []);

    // Eliminar un ítem en Supabase y actualizar la lista local
    const handleDelete = async (id: number) => {
        await deleteTransactions([id]);
    };

    if (isLoading) return <LoadingSpinner />;
    if (error) return <div>Error: {error}</div>;

    // return <LoadingSpinner />;
    return (
        <div className="flex flex-col w-full max-w-3xl mx-auto p-4 md:p-8 md-64:ml-64 border hover:shadow-md transition-shadow bg-white rounded-lg">
            {/* <LoadingSpinner /> */}
            {transactions.map((transaction) => (
                <TransactionItem
                    id={transaction.id}
                    key={transaction.id}
                    description={transaction.description ?? ''}
                    categoryId={transaction.categories.id}
                    subcategory={transaction.subcategories.name}
                    amount={transaction.amount}
                    date={transaction.date}
                    type={transaction.type}
                    onDelete={handleDelete}
                />
            ))}
        </div>
    );
};

export default TransactionList;
