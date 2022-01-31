import { API } from "../config";
import * as qs from "qs";
import { filters } from "../types/common.types";

// eslint-disable-next-line max-len
const getCrypto = (params: filters) => {
  let query = "";
  if (params) {
    query = qs.stringify(params);
  }
  return API.get(`/order-book/fetch-order-books?${query}`);
};

const getCurrency = () => API.get("/order-book/get-currency-pairs");

export const cryptoService = {
  getCrypto,
  getCurrency,
};
