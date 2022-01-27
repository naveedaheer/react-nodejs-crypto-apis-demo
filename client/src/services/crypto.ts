import { API } from "../config";

// eslint-disable-next-line max-len
const getCrypto = () => API.get("/api/v1/fetch");

const getCurrency = () => API.get("/get-currency-pairs");

export const cryptoService = {
  getCrypto,
  getCurrency,
};
