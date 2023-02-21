import React from "react";
import { render } from "@testing-library/react";
import TopTransactions from "./../components/presentation/Transaction/TopTransactions";
import useTransactions from "../components/container/useTransactions";

jest.mock("../components/container/useTransactions");

describe("TopTransactions", () => {
  it("should render top 5 transactions", () => {
    const mockTransactions = {
      "transaction-1": {
        data: {
          "transaction-1": {
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
      },
      "transaction-2": {
        data: {
          "transaction-2": {
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
      },
      "transaction-3": {
        data: {
          "transaction-3": {
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
      },
      "transaction-4": {
        data: {
          "transaction-4": {
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
      },
      "transaction-5": {
        data: {
          "transaction-5": {
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
      },
    };

    useTransactions.mockReturnValue({
      getTopFiveTransactions: () =>
        Object.entries(mockTransactions).slice(0, 5),
      transactions: mockTransactions,
    });

    const { getAllByTestId } = render(<TopTransactions />);
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const transactionDetails = getAllByTestId("transaction-detail");

    expect(transactionDetails).toHaveLength(5);
  });
});
