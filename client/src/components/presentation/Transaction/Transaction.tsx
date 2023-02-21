import { SubscribeType } from "../../../common/interfaces";
import useTransactions from "../../container/useTransactions";
import SearchField from "../global/SearchField";
import TransactionDetail from "./TransactionDetail";

interface IProps {
  subscribe: SubscribeType;
}

const Transaction = ({ subscribe }: IProps) => {
  const {
    subscribeTransaction,
    setTransaction,
    error,
    handleTransactionSubmit,
    transaction,
    transactions,
    transactionLoading,
  } = useTransactions(subscribe);

  return (
    <>
      <SearchField
        name="Search for a transaction hash"
        id="hash"
        handleChange={(e) => setTransaction(e.target.value)}
        handleSubmit={() => handleTransactionSubmit(transaction)}
        handleSubscribe={() => subscribeTransaction(transaction)}
        error={error}
      />
      {transactionLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {transactions[transaction] && (
        <TransactionDetail
          info={transactions[transaction]}
          transaction={transaction}
        />
      )}
    </>
  );
};

export default Transaction;
