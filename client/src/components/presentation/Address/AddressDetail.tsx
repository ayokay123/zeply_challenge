import { AddressInfo } from "../../../common/interfaces";
import useAddressDetail from "../../container/useAddressDetail";
import "./../../../assets/card.css";

interface IProps {
  info: AddressInfo;
  address: string;
}

const AddressDetail = ({ info, address }: IProps) => {
  const { currency, totalReceived, totalSpent, balance } =
    useAddressDetail(info);

  return (
    <div className="card max-w-lg mx-auto p-6 bg-white rounded-md overflow-hidden border border-gray-200 shadow-l text-left">
      <div className="flex flex-row rounded-xl">
        <div className="bubble-1">@</div>
        <div className="bubble-2">
          <div className="bubble-2-1">
            <div className="bubble-2-2">
              <div className="bubble-2-3"></div>
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-2xl py-2 font-medium text-gray-900">
        Bitcoin Address
      </h1>
      <h2 className="text-lg font-medium text-gray-900 py-2">Hash ID</h2>
      <p className="text-base font-medium text-gray-700  break-words">
        {" "}
        {address}
      </p>
      <h2 className="text-lg font-medium text-gray-900 py-2">Details</h2>
      <ul>
        <li className="text-sm font-medium text-gray-700 py-2">
          <span className=" text-gray-900">
            Number of confirmed transactions:
          </span>{" "}
          {info.transaction_count}
        </li>
        <li className="text-sm font-medium text-gray-700 py-2">
          <span className=" text-gray-900">Total received:</span>{" "}
          {totalReceived + " " + currency}
        </li>
        <li className="text-sm font-medium text-gray-700 py-2">
          <span className=" text-gray-900">Total spent:</span>{" "}
          {totalSpent + " " + currency}
        </li>
        <li className="text-sm font-medium text-gray-700 py-2">
          <span className=" text-gray-900">Number of unspent output:</span>{" "}
          {info.unspent_output_count}
        </li>
        <li className="text-sm font-medium text-gray-700 py-2">
          <span className=" text-gray-900">Current address balance:</span>{" "}
          {balance + " " + currency}
        </li>
      </ul>
    </div>
  );
};

export default AddressDetail;
