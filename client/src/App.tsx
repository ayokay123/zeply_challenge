import React from "react";
import "./App.css";
import Currencies from "./components/presentation/Currencies/Currencies";
import Navbar from "./components/presentation/Navbar/Navbar";
import CurrencyProvider from "./context/CurrencyContext";
import { ToastContainer } from "react-toastify";
import { useRoutes } from "react-router-dom";
import Address from "./components/presentation/Address/Address";
import useWebSocket from "./components/container/useWebSocket";
import Transaction from "./components/presentation/Transaction/Transaction";
import TopAddresses from "./components/presentation/Address/TopAddresses";
import TopTransactions from "./components/presentation/Transaction/TopTransactions";
import { ROUTES } from "./common/constants";

function App() {
  const { subscribe } = useWebSocket();

  const routes = useRoutes([
    {
      path: ROUTES.TRANSACTION,
      element: <Transaction subscribe={subscribe} />,
    },
    {
      path: ROUTES.ADDRESS,
      element: <Address subscribe={subscribe} />,
    },
    {
      path: ROUTES.TOP_ADDRESS,
      element: <TopAddresses />,
    },
    {
      path: ROUTES.TOP_TRANSACTION,
      element: <TopTransactions />,
    },
  ]);

  return (
    <div className="App">
      <Navbar />
      <CurrencyProvider>
        <div className="p-4 sm:ml-64">
          <Currencies />
          {routes}
          <ToastContainer />
        </div>
      </CurrencyProvider>
    </div>
  );
}

export default App;
