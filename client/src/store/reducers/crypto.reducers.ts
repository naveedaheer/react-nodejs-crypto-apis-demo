import { OrderBook, CurrencyPair } from "../../types/common.types";
import { AdminTableActionTypes, adminTableConstants } from "../constants";

export interface IState {
  loading: boolean;
  isError: boolean;
  orderBooks: OrderBook;
  currencyPair: CurrencyPair[];
}

const initialState: IState = {
  loading: false,
  isError: false,
  orderBooks: { lastUpdateId: 0, bids: [[]], asks: [[]] },
  currencyPair: [],
};

export const cryptoReducers = (
  state = initialState,
  action: AdminTableActionTypes
): IState => {
  switch (action.type) {
    case adminTableConstants.GET_TABLE_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        isError: false,
      };
    case adminTableConstants.GET_TABLE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        isError: false,
        orderBooks: action.orderBooks,
      };
    case adminTableConstants.GET_TABLE_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        isError: true,
      };
    case adminTableConstants.GET_CURRENCY_PAIR_REQUEST:
      return {
        ...state,
        loading: true,
        isError: false,
      };
    case adminTableConstants.GET_CURRENCY_PAIR_SUCCESS:
      return {
        ...state,
        loading: false,
        isError: false,
        currencyPair: action.currencyPair,
      };
    case adminTableConstants.GET_CURRENCY_PAIR_FAILURE:
      return {
        ...state,
        loading: false,
        isError: true,
      };
    case adminTableConstants.RESET_ORDER_BOOK_STATE:
      return {
        ...state,
        loading: false,
        isError: false,
        orderBooks: { lastUpdateId: 0, bids: [[]], asks: [[]] },
      };
    default:
      return state;
  }
};
