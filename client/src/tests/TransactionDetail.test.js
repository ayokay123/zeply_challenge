import { render, screen } from "@testing-library/react";
import { CURRENCIES } from "../common/constants";
import useTransactionDetail from "./../components/container/useTransactionDetail";
import TransactionDetail from "./../components/presentation/Transaction/TransactionDetail";

jest.mock("./../components/container/useTransactionDetail");

describe("TransactionDetail", () => {
  const info = {
    data: {
      "1c40d72f9b484dd408a6fed56fb6833c1e030e8c0e010c90b2496e346000e": {
        transaction: {
          time: "2022-02-18 10:00:00",
          block_id: 1,
          size: 500,
          input: [{ value: 100 }],
          output: [{ value: 80 }, { value: 10 }],
        },
      },
    },
    context: {
      state: 2,
    },
  };

  beforeEach(() => {
    useTransactionDetail.mockReturnValue({
      currency: CURRENCIES.BTC,
      totalInput: 100,
      totalOutput: 90,
      fee: 10,
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders transaction details correctly", () => {
    const transaction =
      "1c40d72f9b484dd408a6fed56fb6833c1e030e8c0e010c90b2496e346000e";
    render(<TransactionDetail info={info} transaction={transaction} />);

    expect(screen.getByText(`${transaction}`)).toBeInTheDocument();
    expect(screen.getByText(`Received time:`)).toBeInTheDocument();
    expect(
      screen.getByText(`${info.data[transaction].transaction.time}`)
    ).toBeInTheDocument();
    expect(screen.getByText(`Status:`)).toBeInTheDocument();
    expect(screen.getByText(`Confirmed`)).toBeInTheDocument();
    expect(screen.getByText(`Size (in bytes):`)).toBeInTheDocument();
    expect(
      screen.getByText(`${info.data[transaction].transaction.size}`)
    ).toBeInTheDocument();
    expect(screen.getByText(`Number of confirmations:`)).toBeInTheDocument();
    expect(
      screen.getByText(
        `${
          info.context.state - info.data[transaction].transaction.block_id + 1
        }`
      )
    ).toBeInTheDocument();
    expect(screen.getByText(`Total input:`)).toBeInTheDocument();
    expect(screen.getByText(`100 BTC`)).toBeInTheDocument();
    expect(screen.getByText(`Total output:`)).toBeInTheDocument();
    expect(screen.getByText(`90 BTC`)).toBeInTheDocument();
    expect(screen.getByText(`Total fees:`)).toBeInTheDocument();
    expect(screen.getByText(`10 BTC`)).toBeInTheDocument();
  });
});
