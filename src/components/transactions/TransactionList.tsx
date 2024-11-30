import { FC, useState, useEffect } from "react";
import TransactionItem from "./TransactionItem";
import LoadingSpinner from "../shared/Loading";
import { getLatestTransactions } from "../../services/transactionService";

const TransactionList: FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
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
    }, []);

    if (isLoading) return <LoadingSpinner />;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="flex flex-col w-full max-w-3xl mx-auto p-4 md:p-8 md-64:ml-64 border hover:shadow-md transition-shadow bg-white rounded-lg">
            {transactions.map((transaction) => (
                <TransactionItem
                    key={transaction.id}
                    description={transaction.description}
                    categoryId={transaction.categories.id}
                    subcategory={transaction.subcategories.name}
                    amount={transaction.amount}
                    date={transaction.date}
                    type={transaction.type}
                />
            ))}
        </div>
    );
};

export default TransactionList;
