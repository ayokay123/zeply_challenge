import useTransactions from "../../container/useTransactions";
import TransactionDetail from "./TransactionDetail";

export default function TopTransactions() {
  const { getTopFiveTransactions, transactions } = useTransactions();

  return (
    <div>
      <h2 className="text-3xl font-medium text-gray-900 pb-6">
        Top 5 Searched Transactions:
      </h2>
      <div className="space-y-6">
        {getTopFiveTransactions(transactions).map(
          (transaction: [string, any]) => (
            <div key={transaction[0]}>
              <TransactionDetail
                info={transaction[1]}
                transaction={transaction[0]}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
}
