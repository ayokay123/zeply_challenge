import React, { useState } from "react";
import { CurrencyContextType } from "../common/interfaces";

interface IProps {
  children: JSX.Element
}

export const CurrencyContext = React.createContext<CurrencyContextType | null>(null);


const CurrencyProvider = ({ children }: IProps) => {
  const [currency, setCurrency] = useState<string>("BTC");
  return (
    <CurrencyContext.Provider value={{currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyProvider;
