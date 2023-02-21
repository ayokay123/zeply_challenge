import { renderHook } from "@testing-library/react-hooks";
import { CurrencyContext } from "../context/CurrencyContext";
import useTransactionDetail from "../components/container/useTransactionDetail";
import { CURRENCIES } from "../common/constants";

describe("useTransactionDetail", () => {
  it("should return the expected values", () => {
    const info = {
      input_total_usd: 100,
      output_total_usd: 200,
      fee_usd: 10,
    };
    const currency = CURRENCIES.EUR;

    const wrapper = ({ children }) => (
      <CurrencyContext.Provider value={{ currency }}>
        {children}
      </CurrencyContext.Provider>
    );

    const { result, waitForNextUpdate } = renderHook(
      () => useTransactionDetail(info),
      { wrapper }
    );

    // Initially, the values should be 0
    expect(result.current.totalInput).toBe(0);
    expect(result.current.totalOutput).toBe(0);
    expect(result.current.fee).toBe(0);

    // Wait for the first update
    // eslint-disable-next-line jest/valid-expect-in-promise
    waitForNextUpdate().then(() => {
      // After the first update, the values should be converted
      expect(result.current.totalInput).toBeGreaterThan(0);
      expect(result.current.totalOutput).toBeGreaterThan(0);
      expect(result.current.fee).toBeGreaterThan(0);
    });
  });
});
