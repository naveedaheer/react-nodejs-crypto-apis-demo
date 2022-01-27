import { Common } from "../../types/common.types";
import { AdminTableActionTypes, adminTableConstants } from "../constants";


export interface IState {
    loading: boolean;
    isError: boolean;
    bidList: Common[];

}

const initialState: IState = {
    loading: false,
    isError: false,
    bidList: []
};

export const cryptoReducers = (state = initialState, action: AdminTableActionTypes): IState => {
    switch (action.type) {
        case adminTableConstants.GET_TABLE_LIST_REQUEST:
            return {
                ...state, loading: true, isError: false,
            };
        case adminTableConstants.GET_TABLE_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                isError: false,
                bidList:action.bidList,               
            };
        case adminTableConstants.GET_TABLE_LIST_FAILURE:
            return {
                ...state, loading: false, isError: true, 
            };
        default:
            return state;
    }
};
