import { renderHook, act } from "@testing-library/react-hooks";
import useTransactions from "./../components/container/useTransactions";
import { useLocalStorage } from "./../components/container/useLocalStorage";
import BlockChairService from "./../services/blokchair.api";

jest.mock("./../components/container/useLocalStorage"); // mock useLocalStorage custom hook

jest.mock("../services/blokchair.api", () => {
  return {
    getTransaction: jest.fn(),
  };
});

describe("useTransactions", () => {
  let mockSetTransactions;

  beforeEach(() => {
    jest.clearAllMocks();
    mockSetTransactions = jest.fn();
    useLocalStorage.mockReturnValue([{}, mockSetTransactions]);
  });

  /**
   * @test
   * @function: handleTransactionSubmit()
   */
  it("should handle transaction submit correctly", async () => {
    const { result } = renderHook(() => useTransactions());
    const mockTransaction =
      "1c40d72f9b484dd40877ba6fed56fb6833c1e030e8c0e010c90b2496e346000e";

    // Set mock response for getTransaction
    const mockResponseData = { data: "mock-data" };
    BlockChairService.getTransaction.mockResolvedValueOnce(mockResponseData);

    // Call handleTransactionSubmit
    await act(async () => {
      result.current.handleTransactionSubmit(mockTransaction);
    });

    expect(mockSetTransactions).toHaveBeenCalledTimes(1);
    expect(result.current.transactionLoading).toBe(false);
  });

  it("should handle transaction submit with invalid transaction", async () => {
    const { result } = renderHook(() => useTransactions());
    const mockTransaction = "invalid-transaction";

    // Call handleTransactionSubmit
    await act(async () => {
      result.current.handleTransactionSubmit(mockTransaction);
    });

    expect(mockSetTransactions).not.toHaveBeenCalled();
    expect(result.current.transactionLoading).toBe(false);
    expect(result.current.error).toBe("Invalid transaction");
  });

  it("should handle transaction submit with not found transaction", async () => {
    const { result } = renderHook(() => useTransactions());
    const mockTransaction =
      "1c40d72f9b484dd40877ba6fed56fb6833c1e030e8c0e010c90b2496e346000e";

    // Set mock  to return null
    BlockChairService.getTransaction.mockResolvedValueOnce(null);

    // Call handleTransactionSubmit
    await act(async () => {
      result.current.handleTransactionSubmit(mockTransaction);
    });

    expect(mockSetTransactions).not.toHaveBeenCalled();
    expect(result.current.transactionLoading).toBe(false);
    expect(result.current.error).toBe("Transaction not found");
  });

  /**
   * @test
   * @function: getTopFiveTransactions()
   */
  it("returns an array of the top five transactions", () => {
    useLocalStorage.mockReturnValue([
      {
        "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef": {
          count: 1,
        },
        "fedcba9876543210fedcba9876543210fedcba9876543210fedcba9876543210": {
          count: 2,
        },
        "deadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef": {
          count: 3,
        },
        "baadf00dbaadf00dbaadf00dbaadf00dbaadf00dbaadf00dbaadf00dbaadf00d": {
          count: 4,
        },
        "cafef00dcafef00dcafef00dcafef00dcafef00dcafef00dcafef00dcafef00d": {
          count: 5,
        },
        "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0": {
          count: 6,
        },
      },
      mockSetTransactions,
    ]);

    const { result } = renderHook(() => useTransactions());

    const expectedTopFive = [
      [
        "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0",
        { count: 6 },
      ],
      [
        "cafef00dcafef00dcafef00dcafef00dcafef00dcafef00dcafef00dcafef00d",
        { count: 5 },
      ],
      [
        "baadf00dbaadf00dbaadf00dbaadf00dbaadf00dbaadf00dbaadf00dbaadf00d",
        { count: 4 },
      ],
      [
        "deadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef",
        { count: 3 },
      ],
      [
        "fedcba9876543210fedcba9876543210fedcba9876543210fedcba9876543210",
        { count: 2 },
      ],
    ];
    const topFive = result.current.getTopFiveTransactions(
      result.current.transactions
    );
    expect(topFive).toEqual(expectedTopFive);
  });

  /**
   * @test
   * @function: validateHash()
   */
  it("returns true for a valid transaction hash", () => {
    const { result } = renderHook(() => useTransactions());

    const validTransactionHash =
      "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";
    const isValid = result.current.validateHash(validTransactionHash);
    expect(isValid).toBe(true);
  });

  it("returns false for an invalid transaction hash", () => {
    const { result } = renderHook(() => useTransactions());

    const invalidTransactionHash = "not a valid hash";
    const isValid = result.current.validateHash(invalidTransactionHash);
    expect(isValid).toBe(false);
  });

  /**
   * @test
   * @function: subscribeTransaction()
   */
  it("calls subscribe function with correct arguments when transaction hash is valid", () => {
    const subscribe = jest.fn();
    const { result } = renderHook(() => useTransactions(subscribe));

    // Valid transaction hashs
    const validTransactionHash =
      "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";
    result.current.subscribeTransaction(validTransactionHash);

    expect(subscribe).toHaveBeenCalled();
  });

  it("does not call subscribe function and sets error message when transaction hash is invalid", () => {
    const subscribe = jest.fn();
    const { result } = renderHook(() => useTransactions(subscribe));

    // Invalid transaction hash
    const invalidTransactionHash = "not a valid hash";
    result.current.subscribeTransaction(invalidTransactionHash);

    expect(subscribe).not.toHaveBeenCalled();
    expect(result.current.error).toBe("Invalid transaction hash");
  });
});
