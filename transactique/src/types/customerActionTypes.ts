import { UserResponse } from "../models/UserResponse";

export const GET_CUSTOMER_INFO_REQUEST = 'GET_CUSTOMER_INFO_REQUEST';
export const GET_CUSTOMER_INFO_SUCCESS = 'GET_CUSTOMER_INFO_SUCCESS';
export const GET_CUSTOMER_INFO_FAILURE = 'GET_CUSTOMER_INFO_FAILURE';


export interface GetCustomerInfoSuccess {
  response: UserResponse;
}

export interface GetCustomerInfoFailure {
  message: string;
}

interface CustomerInfoRequest {
  type: typeof GET_CUSTOMER_INFO_REQUEST;

}

interface CustomerInfoSuccess {
  type: typeof GET_CUSTOMER_INFO_SUCCESS;
  payload: GetCustomerInfoSuccess;

}

interface CustomerInfoFailure {
  type: typeof GET_CUSTOMER_INFO_FAILURE;
  payload: GetCustomerInfoFailure;

}

export type GetCustomerInfoType = CustomerInfoRequest | CustomerInfoSuccess | CustomerInfoFailure;