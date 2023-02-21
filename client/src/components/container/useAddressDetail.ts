import React, { useContext, useEffect, useState } from "react";
import { CURRENCIES } from "../../common/constants";
import { Address, CurrencyContextType } from "../../common/interfaces";
import { CurrencyContext } from "../../context/CurrencyContext";
import useCurrencyConverter from "./useCurrencyConverter";

const useAddressDetail = (info: Address) => {
  const { currency } =
    (useContext(CurrencyContext) as CurrencyContextType) || {};
  const { convertCurrency } = useCurrencyConverter();

  const [totalReceived, setTotalReceived] = useState<number>(0);
  const [totalSpent, setTotalSpent] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    const getData = async () => {
      const receivedConverted = await convertCurrency(
        info.received_usd,
        CURRENCIES.USD,
        currency
      );
      const spentConverted = await convertCurrency(
        info.spent_usd,
        CURRENCIES.USD,
        currency
      );
      const balanceConverted = await convertCurrency(
        info.balance_usd,
        CURRENCIES.USD,
        currency
      );

      setTotalReceived(receivedConverted);
      setTotalSpent(spentConverted);
      setBalance(balanceConverted);
    };
    getData();
  }, [currency]);

  return {
    currency,
    totalReceived,
    totalSpent,
    balance,
  };
};

export default useAddressDetail;
