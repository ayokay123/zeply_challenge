import { render, screen } from "@testing-library/react";
import SearchField from "../components/presentation/global/SearchField";

describe("SearchField", () => {
  it("Case1 check subscribe and submit button are displayed", () => {
    render(
      <SearchField
        handleSubscribe={() => {
          console.log("Subscribed!");
        }}
      />
    );

    expect(screen.getByRole("button", { name: "Subscribe" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "Submit" })).toBeEnabled();
  });

  it("Case2 check if border is red when error is true", () => {
    render(<SearchField error={"it's an error"} />);
    const input = screen.getByTestId("input");
    expect(input).toHaveClass("border-red-500");
  });

  it("Case3 test if label is displayed with name correctly", () => {
    render(<SearchField name={"Search for address"} />);
    const input = screen.getByTestId("label");
    expect(input.innerHTML).toBe("Search for address");
  });
});
