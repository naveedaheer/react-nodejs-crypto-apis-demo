import { Dispatch } from "redux";
import { AxiosError } from "axios";
import { adminTableConstants } from "../constants";
import { OrderBook, CurrencyPair } from "../../types/common.types";
import { cryptoService } from "../../services/crypto";

const getSettlementList = (params: any) => {
  const request = () => ({ type: adminTableConstants.GET_TABLE_LIST_REQUEST });
  const success = (orderBooks: OrderBook[]) => ({
    type: adminTableConstants.GET_TABLE_LIST_SUCCESS,
    orderBooks,
  });
  const failure = (error: any) => ({
    type: adminTableConstants.GET_TABLE_LIST_FAILURE,
    error,
  });
  return (dispatch: Dispatch) => {
    dispatch(request());
    cryptoService
      .getCrypto(params)
      .then((res) => {
        dispatch(success(res.data));
      })
      .catch((error: AxiosError) =>
        dispatch(failure(error.response?.data?.errors || []))
      );
  };
};

const getCurrencyPair = () => {
  const request = () => ({
    type: adminTableConstants.GET_CURRENCY_PAIR_REQUEST,
  });
  const success = (currencyPair: CurrencyPair[]) => ({
    type: adminTableConstants.GET_CURRENCY_PAIR_SUCCESS,
    currencyPair,
  });
  const failure = (error: any) => ({
    type: adminTableConstants.GET_CURRENCY_PAIR_FAILURE,
    error,
  });
  return (dispatch: Dispatch) => {
    dispatch(request());
    cryptoService
      .getCurrency()
      .then((res) => {
        dispatch(success(res.data));
      })
      .catch((error: AxiosError) =>
        dispatch(failure(error.response?.data?.errors || []))
      );
  };
};

export const cryptoActions = {
  getSettlementList,
  getCurrencyPair,
};
