import CurrencyService from "../services/currency.api";
import useCurrencyConverter from "../components/container/useCurrencyConverter";
import { CURRENCIES } from "../common/constants";

jest.mock("../services/currency.api");

describe("useCurrencyConverter", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should convert currency correctly", async () => {
    const mockGetCurrencyData = CurrencyService.getCurrencyData;
    mockGetCurrencyData.mockResolvedValueOnce({
      rates: { USD: 1, EUR: 0.83, GBP: 0.72 },
    });
    const { convertCurrency } = useCurrencyConverter();
    const result = await convertCurrency(100, CURRENCIES.USD, CURRENCIES.EUR);
    expect(result).toEqual(83);
  });
});