import { Common } from "../../types/common.types";

interface Types {
  GET_TABLE_LIST_REQUEST: string;
  GET_TABLE_LIST_SUCCESS: string;
  GET_TABLE_LIST_FAILURE: string;

}

export const adminTableConstants: Types = {

  GET_TABLE_LIST_REQUEST: 'GET_TABLE_LIST_REQUEST',
  GET_TABLE_LIST_SUCCESS: 'GET_TABLE_LIST_SUCCESS',
  GET_TABLE_LIST_FAILURE: 'GET_TABLE_LIST_FAILURE',
}
interface LoadGetAdminTableListAction {
type: typeof adminTableConstants.GET_TABLE_LIST_REQUEST;
bidList:Common[]
}

interface LoadedGetAdminTableListAction {
  type: typeof adminTableConstants.GET_TABLE_LIST_SUCCESS;
  bidList:Common[]
}

interface FailedGetAdminTableListAction {
  type: typeof adminTableConstants.GET_TABLE_LIST_FAILURE;
  bidList:Common[]
}



export type AdminTableActionTypes
  = LoadGetAdminTableListAction
  | LoadedGetAdminTableListAction
  | FailedGetAdminTableListAction;
