import { supabase } from "../lib/supabase";

export const getLatestTransactions = async () => {
    const { data, error } = await supabase
        .from("transactions")
        .select("*, categories (id, name), subcategories (id, name)")
        .order("date", { ascending: false })
        .limit(5);

    if (error) {
        throw new Error(error.message);
    }
    return data;
};

export const createTransaction = async (transaction: Transaction) => {
    const { data, error } = await supabase
        .from("transactions")
        .insert(transaction);
    if (error) throw error;
    return data;
};
export const deleteTransactions = async (transactionIds: number[]): Promise<void> => {
    const { error } = await supabase
        .from("transactions")
        .delete()
        .in("id", transactionIds);

    if (error) {
        console.error('Error en deleteTransactions:', error);
        throw new Error('Error al eliminar las transacciones');
    }
};
