import { renderHook } from "@testing-library/react-hooks";
import { useLocalStorage } from "../components/container/useLocalStorage";

describe("useLocalStorage", () => {
  afterEach(() => {
    localStorage.clear();
  });

  it("should set and get a value from localStorage", () => {
    const key = "testKey";
    const initialValue = 123;
    const { result } = renderHook(() => useLocalStorage(key, initialValue));
    const [value] = result.current;

    expect(value).toBe(initialValue);
    expect(localStorage.getItem(key)).toBe(JSON.stringify(initialValue));
  });
});
