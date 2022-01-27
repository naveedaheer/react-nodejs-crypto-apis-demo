import { Dispatch } from "redux";
import { AxiosError } from "axios";
import { adminTableConstants } from "../constants";
import { Common, CurrencyPair } from "../../types/common.types";
import { cryptoService } from "../../services/crypto";

const getSettlementList = () => {
  const request = () => ({ type: adminTableConstants.GET_TABLE_LIST_REQUEST });
  const success = (bidList: Common[]) => ({
    type: adminTableConstants.GET_TABLE_LIST_SUCCESS,
    bidList,
  });
  const failure = (error: any) => ({
    type: adminTableConstants.GET_TABLE_LIST_FAILURE,
    error,
  });
  return (dispatch: Dispatch) => {
    dispatch(request());
    cryptoService
      .getCrypto()
      .then((res) => {
        dispatch(success(res.data.data));
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
