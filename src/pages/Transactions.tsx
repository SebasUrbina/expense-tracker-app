import MainLayout from "../components/layout/MainLayout";
import TransactionForm from "../components/transactions/TransactionForm";
import TransactionList from "../components/transactions/TransactionList";
import Test from "../components/transactions/test";

const Transactions: React.FC = () => {
    // const [transactionUpdated, setTransactionUpdated] = useState(false);

    // const handleTransactionUpdated = () => {
    //     setTransactionUpdated(true);
    // };

    return (
        <MainLayout>
            <div className="flex flex-col md:flex-row h-full">
                <div className="w-full md:w-3/5 p-4">
                    <TransactionForm />
                </div>
                <div className="w-full md:w-2/5 p-4">
                    <TransactionList />
                </div>
            </div>
        </MainLayout>
    );
};

export default Transactions;
