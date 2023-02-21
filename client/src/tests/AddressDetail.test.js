import { render, screen } from "@testing-library/react";
import { CURRENCIES } from "../common/constants";
import useAddressDetail from "./../components/container/useAddressDetail";
import AddressDetail from "./../components/presentation/Address/AddressDetail";

jest.mock("./../components/container/useAddressDetail");

describe("AddressDetail", () => {
  const info = {
    transaction_count: 10,
    unspent_output_count: 5,
  };
  const address = "1Address";

  beforeEach(() => {
    useAddressDetail.mockReturnValue({
      currency: CURRENCIES.BTC,
      totalReceived: "0.001",
      totalSpent: "0.0005",
      balance: "0.0008",
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("displays address details", () => {
    render(<AddressDetail info={info} address={address} />);
    expect(screen.getByText(`${address}`)).toBeInTheDocument();
    expect(screen.getByText(`Total received:`)).toBeInTheDocument();
    expect(screen.getByText(`0.001 BTC`)).toBeInTheDocument();
    expect(screen.getByText(`Total spent:`)).toBeInTheDocument();
    expect(screen.getByText(`0.0005 BTC`)).toBeInTheDocument();
    expect(screen.getByText(`Number of unspent output:`)).toBeInTheDocument();
    expect(
      screen.getByText(`${info.unspent_output_count}`)
    ).toBeInTheDocument();
    expect(screen.getByText(`Current address balance:`)).toBeInTheDocument();
    expect(screen.getByText(`0.0005 BTC`)).toBeInTheDocument();
  });
});
