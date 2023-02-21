import { renderHook, act } from "@testing-library/react-hooks";
import useAddresses from "./../components/container/useAddresses";
import { useLocalStorage } from "./../components/container/useLocalStorage";
import BlockChairService from "./../services/blokchair.api";

jest.mock("./../components/container/useLocalStorage"); // mock useLocalStorage custom hook

jest.mock("../services/blokchair.api", () => {
  return {
    getAddress: jest.fn(),
  };
});

describe("useAddresses", () => {
  let mockSetAddresses;

  beforeEach(() => {
    jest.clearAllMocks();
    mockSetAddresses = jest.fn();
    useLocalStorage.mockReturnValue([{}, mockSetAddresses]);
  });

  /**
   * @test
   * @function: handleAddressSubmit()
   */
  it("should handle address submit correctly", async () => {
    const { result } = renderHook(() => useAddresses());
    const mockAddress = "3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5";

    // Set mock response for getAddress
    const mockResponseData = { data: "mock-data" };
    BlockChairService.getAddress.mockResolvedValueOnce(mockResponseData);

    // Call handleAddressSubmit
    await act(async () => {
      result.current.handleAddressSubmit(mockAddress);
    });

    expect(mockSetAddresses).toHaveBeenCalledTimes(1);
    expect(result.current.loadingAddress).toBe(false);
  });

  it("should handle address submit with invalid address", async () => {
    const { result } = renderHook(() => useAddresses());
    const mockAddress = "invalid-address";

    // Call handleAddressSubmit
    await act(async () => {
      result.current.handleAddressSubmit(mockAddress);
    });

    expect(mockSetAddresses).not.toHaveBeenCalled();
    expect(result.current.loadingAddress).toBe(false);
    expect(result.current.error).toBe("Invalid address");
  });

  it("should handle address submit with not found address", async () => {
    const { result } = renderHook(() => useAddresses());
    const mockAddress = "3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5";

    // Set mock  to return null
    BlockChairService.getAddress.mockResolvedValueOnce(null);

    // Call handleAddressSubmit
    await act(async () => {
      result.current.handleAddressSubmit(mockAddress);
    });

    expect(mockSetAddresses).not.toHaveBeenCalled();
    expect(result.current.loadingAddress).toBe(false);
    expect(result.current.error).toBe("Address not found");
  });

  /**
   * @test
   * @function: getTopFiveAddresses()
   */
  it("returns an array of the top five addresses", () => {
    useLocalStorage.mockReturnValue([
      {
        "address-1": {
          count: 1,
        },
        "address-2": {
          count: 2,
        },
        "address-3": {
          count: 3,
        },
        "address-4": {
          count: 4,
        },
        "address-5": {
          count: 5,
        },
        "address-6": {
          count: 6,
        },
      },
      mockSetAddresses,
    ]);

    const { result } = renderHook(() => useAddresses());

    const expectedTopFive = [
      ["address-6", { count: 6 }],
      ["address-5", { count: 5 }],
      ["address-4", { count: 4 }],
      ["address-3", { count: 3 }],
      ["address-2", { count: 2 }],
    ];
    const topFive = result.current.getTopFiveAddresses(
      result.current.addresses
    );
    expect(topFive).toEqual(expectedTopFive);
  });

  /**
   * @test
   * @function: validateAddress()
   */
  it("returns true for a valid address hash", () => {
    const { result } = renderHook(() => useAddresses());

    const validAddressHash = "3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5";
    const isValid = result.current.validateAddress(validAddressHash);
    expect(isValid).toBe(true);
  });

  it("returns false for an invalid address hash", () => {
    const { result } = renderHook(() => useAddresses());

    const invalidAddressHash = "not a valid hash";
    const isValid = result.current.validateAddress(invalidAddressHash);
    expect(isValid).toBe(false);
  });

  /**
   * @test
   * @function: subscribeAddress()
   */
  it("calls subscribe function with correct arguments when address hash is valid", () => {
    const subscribe = jest.fn();
    const { result } = renderHook(() => useAddresses(subscribe));

    // Valid address hashs
    const validAddressHash = "3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5";
    result.current.subscribeAddress(validAddressHash);

    expect(subscribe).toHaveBeenCalled();
  });

  it("does not call subscribe function and sets error message when address hash is invalid", () => {
    const subscribe = jest.fn();
    const { result } = renderHook(() => useAddresses(subscribe));

    // Invalid address hash
    const invalidAddressHash = "not a valid hash";
    result.current.subscribeAddress(invalidAddressHash);

    expect(subscribe).not.toHaveBeenCalled();
    expect(result.current.error).toBe("Invalid address");
  });
});
