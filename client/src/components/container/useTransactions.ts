import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import BlockChairService from "../../services/blokchair.api";
import { SUBSCRIBE_TYPES } from "../../common/constants";
import { SubscribeType } from "../../common/interfaces";

const useTransactions = (subscribe?: SubscribeType) => {
  const [transactions, setTransactions] = useLocalStorage("transactions", {});

  const [error, setError] = useState<string>("");
  const [transaction, setTransaction] = useState<string>("");
  const [transactionLoading, setTransactionLoading] = useState<boolean>(false);

  /** Validate transaction hash format */
  const validateHash = (transaction: string): boolean => {
    const regex = /^[a-fA-F0-9]{64}$/;
    return regex.test(transaction);
  };

  /** Get transaction data */
  const handleTransactionSubmit = async (
    transaction: string
  ): Promise<void> => {
    setError("");
    if (!validateHash(transaction)) {
      setError("Invalid transaction");
      return;
    }

    setTransactionLoading(true);
    const transactionData = await BlockChairService.getTransaction(transaction);

    if (transactionData) {
      // Set transaction in localStorage
      setTransactions((prevTransactions: any) => ({
        ...prevTransactions,
        [transaction]: {
          ...transactionData,
          // increment count if transaction hash already searched
          count: ~~prevTransactions[transaction]?.count + 1,
        },
      }));
    } else {
      setError("Transaction not found");
    }

    setTransactionLoading(false);
  };

  /** Subscribe to a transaction */
  const subscribeTransaction = (transaction: string): void => {
    setError("");
    if (!validateHash(transaction)) {
      setError("Invalid transaction hash");
      return;
    }

    if (typeof subscribe == "function") {
      subscribe(SUBSCRIBE_TYPES.SUBSCRIBE_TRANSACTION, transaction);
    }
  };

  /** Get Top Five transactions */
  const getTopFiveTransactions = (transactions: any) => {
    return Object.entries(transactions)
      .sort(([, a]: any, [, b]: any) => {
        return b.count - a.count;
      })
      .slice(0, 5);
  };

  return {
    getTopFiveTransactions,
    subscribeTransaction,
    transaction,
    transactions,
    setTransaction,
    error,
    handleTransactionSubmit,
    transactionLoading,
    validateHash
  };
};

export default useTransactions;
