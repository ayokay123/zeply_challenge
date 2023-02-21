import React, { useContext } from "react";
import { CURRENCIES } from "../../../common/constants";
import { CurrencyContextType } from "../../../common/interfaces";
import {
  CurrencyContext,
} from "../../../context/CurrencyContext";

const Currencies = () => {
  const { currency, setCurrency } = useContext(
    CurrencyContext
  ) as CurrencyContextType;

  return (
    <div className="space-x-4 pt-20 pb-10">
      {Object.values(CURRENCIES).map((value: string) => {
        return (
          <button
            className={`${
              currency === value ? "bg-indigo-700" : "bg-indigo-500"
            } hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded `}
            key={value}
            onClick={() => setCurrency(value)}
          >
            {value}
          </button>
        );
      })}

    </div>
  );
};

export default Currencies;
