import { API } from "../config";
import * as qs from "qs";

// eslint-disable-next-line max-len
const getCrypto = (params: any) => {
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
