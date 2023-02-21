import React from "react";
import { Transaction } from "../../../common/interfaces";
import useTransactionDetail from "../../container/useTransactionDetail";
import Confirmed from "../global/Confirmed";
import Unconfirmed from "../global/Unconfirmed";
import "./../../../assets/card.css";

const TransactionDetail = ({ info, transaction }: any) => {
  const data = info.data[transaction].transaction as Transaction;
  const { currency, totalInput, totalOutput, fee } = useTransactionDetail(data);

  return (
    <div data-testid="transaction-detail" className="card max-w-lg mx-auto p-6 bg-white rounded-md overflow-hidden border border-gray-200 shadow-l text-left">
      <div className="flex flex-row rounded-xl">
        <div className="bubble-1">TX</div>
        <div className="bubble-2">
          <div className="bubble-2-1">
            <div className="bubble-2-2">
              <div className="bubble-2-3"></div>
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-2xl py-2 font-medium text-gray-900">
        Bitcoin Transaction
      </h1>
      <h2 className="text-lg font-medium text-gray-900 py-2">Hash ID</h2>
      <p className="text-base font-medium text-gray-700  break-words">
        {" "}
        {transaction}
      </p>
      <h2 className="text-lg font-medium text-gray-900 py-2">Details</h2>
      <ul>
        <li className="text-sm font-medium text-gray-700 py-2">
          <span className=" text-gray-900">Received time:</span> {data.time}
        </li>
        <li className="text-sm font-medium text-gray-700 py-2">
          <span className=" text-gray-900">Status:</span>{" "}
          {data.block_id !== -1 ? <Confirmed /> : <Unconfirmed />}
        </li>
        <li className="text-sm font-medium text-gray-700 py-2">
          <span className=" text-gray-900">Size (in bytes):</span> {data.size}
        </li>
        <li className="text-sm font-medium text-gray-700 py-2">
          <span className=" text-gray-900">Number of confirmations:</span>{" "}
          {info.context.state - data.block_id + 1}
        </li>
        <li className="text-sm font-medium text-gray-700 py-2">
          <span className=" text-gray-900">Total input:</span>{" "}
          {totalInput + " " + currency}
        </li>
        <li className="text-sm font-medium text-gray-700 py-2">
          <span className=" text-gray-900">Total output:</span>{" "}
          {totalOutput + " " + currency}
        </li>
        <li className="text-sm font-medium text-gray-700 py-2">
          <span className=" text-gray-900">Total fees:</span>{" "}
          {fee + " " + currency}
        </li>
      </ul>
    </div>
  );
};

export default TransactionDetail;
