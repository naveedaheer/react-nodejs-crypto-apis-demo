import { Common, CurrencyPair } from "../../types/common.types";

interface Types {
  GET_TABLE_LIST_REQUEST: string;
  GET_TABLE_LIST_SUCCESS: string;
  GET_TABLE_LIST_FAILURE: string;

  GET_CURRENCY_PAIR_REQUEST: string;
  GET_CURRENCY_PAIR_SUCCESS: string;
  GET_CURRENCY_PAIR_FAILURE: string;
}

export const adminTableConstants: Types = {
  GET_TABLE_LIST_REQUEST: "GET_TABLE_LIST_REQUEST",
  GET_TABLE_LIST_SUCCESS: "GET_TABLE_LIST_SUCCESS",
  GET_TABLE_LIST_FAILURE: "GET_TABLE_LIST_FAILURE",

  GET_CURRENCY_PAIR_REQUEST: "GET_CURRENCY_PAIR_REQUEST",
  GET_CURRENCY_PAIR_SUCCESS: "GET_CURRENCY_PAIR_SUCCESS",
  GET_CURRENCY_PAIR_FAILURE: "GET_CURRENCY_PAIR_FAILURE",
};
interface LoadGetAdminTableListAction {
  type: typeof adminTableConstants.GET_TABLE_LIST_REQUEST;
  bidList: Common[];
  currencyPair: CurrencyPair[];
}

interface LoadedGetAdminTableListAction {
  type: typeof adminTableConstants.GET_TABLE_LIST_SUCCESS;
  bidList: Common[];
  currencyPair: CurrencyPair[];
}

interface FailedGetAdminTableListAction {
  type: typeof adminTableConstants.GET_TABLE_LIST_FAILURE;
  bidList: Common[];
  currencyPair: CurrencyPair[];
}

interface LoadGetCurrencyPairListAction {
  type: typeof adminTableConstants.GET_CURRENCY_PAIR_REQUEST;
  bidList: Common[];
  currencyPair: CurrencyPair[];
}

interface LoadedGetCurrencyPairListAction {
  type: typeof adminTableConstants.GET_CURRENCY_PAIR_SUCCESS;
  bidList: Common[];
  currencyPair: CurrencyPair[];
}

interface FailedGetCurrencyPairListAction {
  type: typeof adminTableConstants.GET_CURRENCY_PAIR_FAILURE;
  bidList: Common[];
  currencyPair: CurrencyPair[];
}
export type AdminTableActionTypes =
  | LoadGetAdminTableListAction
  | LoadedGetAdminTableListAction
  | FailedGetAdminTableListAction
  | LoadGetCurrencyPairListAction
  | LoadedGetCurrencyPairListAction
  | FailedGetCurrencyPairListAction;
