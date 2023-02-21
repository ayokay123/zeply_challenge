import { CURRENCIES } from "../../common/constants";
import CurrencyService from "../../services/currency.api";
import { Currency } from "./../../common/interfaces";

const useCurrencyConverter = () => {
  const conversionRate = async (): Promise<any> => {
    return await CurrencyService.getCurrencyData(CURRENCIES.USD);
  };

  async function convertCurrency(
    amount: number,
    fromCurrency: string,
    toCurrency: string
  ): Promise<number> {
    const conversionData = await conversionRate() as Currency;
    if (conversionData) {
      const fromRate = conversionData.rates[fromCurrency];
      const toRate = conversionData.rates[toCurrency];
      const convertedAmount = amount * (toRate / fromRate);
      return convertedAmount;
    }
    return 0;
  }
  return { convertCurrency };
};

export default useCurrencyConverter;
