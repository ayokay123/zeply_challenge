import axios from "axios";

export const API_URL = "https://api.blockchair.com";

export const CURRENCY_API_URL = `https://openexchangerates.org/api/`;

export const API_KEY = "95693f0b80754e31905f16774b71d956";

export const SOCKET_ENDPOINT = "http://localhost:5000/";

export const http = axios.create({
  baseURL: API_URL + "/bitcoin/dashboards",
  headers: {
    "Content-type": "application/json",
  },
});

export const httpCurrency = axios.create({
  baseURL: CURRENCY_API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

export const CURRENCIES = {
  USD: "USD",
  EUR: "EUR",
  BTC: "BTC",
};

export const SOCKET_EVENTS = {
  SUBSCRIBED_TRANSACTION: "subscribedTransaction",
  NEW_TRANSACTION: "newTransaction",
  SUBSCRIBED_ADDRESS: "subscribedAddress",
  NEW_ADDRESS: "newAddress",
};

export const SUBSCRIBE_TYPES = {
  SUBSCRIBE_ADDRESS: "subscribeAddress",
  SUBSCRIBE_TRANSACTION: "subscribeTransaction",
};

export const ROUTES = {
  ADDRESS: "/",
  TRANSACTION: "/transaction",
  TOP_ADDRESS: "/top_addresses",
  TOP_TRANSACTION: "/top_transactions"
}