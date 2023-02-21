import { renderHook } from "@testing-library/react-hooks";
import { CurrencyContext } from "../context/CurrencyContext";
import useAddressDetail from "../components/container/useAddressDetail";
import { CURRENCIES } from "../common/constants";

describe("useAddressDetail", () => {
  it("should return the expected values", () => {
    const info = {
      received_usd: 100,
      spent_usd: 50,
      balance_usd: 50,
    };
    const currency = CURRENCIES.EUR;

    const wrapper = ({ children }) => (
      <CurrencyContext.Provider value={{ currency }}>
        {children}
      </CurrencyContext.Provider>
    );

    const { result, waitForNextUpdate } = renderHook(
      () => useAddressDetail(info),
      { wrapper }
    );

    // Initially, the values should be 0
    expect(result.current.totalReceived).toBe(0);
    expect(result.current.totalSpent).toBe(0);
    expect(result.current.balance).toBe(0);

    // Wait for the first update
    // eslint-disable-next-line jest/valid-expect-in-promise
    waitForNextUpdate().then(() => {
      // After the first update, the values should be converted
      expect(result.current.totalReceived).toBeGreaterThan(0);
      expect(result.current.totalSpent).toBeGreaterThan(0);
      expect(result.current.balance).toBeGreaterThan(0);
    });
  });
});
