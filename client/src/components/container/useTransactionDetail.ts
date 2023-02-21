import React, { useContext, useEffect, useState } from "react";
import { CURRENCIES } from "../../common/constants";
import { CurrencyContextType, Transaction } from "../../common/interfaces";
import { CurrencyContext } from "../../context/CurrencyContext";
import useCurrencyConverter from "./useCurrencyConverter";

const useTransactionDetail = (info: Transaction) => {
  const { currency } =
    (useContext(CurrencyContext) as CurrencyContextType) || {};
  const { convertCurrency } = useCurrencyConverter();

  const [totalInput, setTotalInput] = useState<number>(0);
  const [totalOutput, setTotalOutput] = useState<number>(0);
  const [fee, setFee] = useState<number>(0);

  useEffect(() => {
    const getData = async () => {
      const inputConverted = await convertCurrency(
        info.input_total_usd,
        CURRENCIES.USD,
        currency
      );
      const outputConverted = await convertCurrency(
        info.output_total_usd,
        CURRENCIES.USD,
        currency
      );
      const feeConverted = await convertCurrency(
        info.fee_usd,
        CURRENCIES.USD,
        currency
      );

      setTotalInput(inputConverted);
      setTotalOutput(outputConverted);
      setFee(feeConverted);
    };
    getData();
  }, [currency]);

  return {
    currency,
    totalInput,
    totalOutput,
    fee,
  };
};

export default useTransactionDetail;
