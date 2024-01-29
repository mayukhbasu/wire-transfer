import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './get-customer-actions'; // Adjust the path to your actions file
import axios from 'axios';
import { GET_CUSTOMER_INFO_REQUEST, GET_CUSTOMER_INFO_SUCCESS, GET_CUSTOMER_INFO_FAILURE } from '../types/getCustomerActionTypes';

// Mock axios module
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('fetchCustomerInfo action creator', () => {
  it('creates GET_CUSTOMER_INFO_SUCCESS when fetching customer info has been done', () => {
    const customerData = { id: 1, name: 'John Doe' }; // Sample response data
    mockedAxios.get.mockResolvedValue({ data: customerData });

    const expectedActions = [
      { type: GET_CUSTOMER_INFO_REQUEST },
      { type: GET_CUSTOMER_INFO_SUCCESS, payload: customerData }
    ];

    const store = mockStore({ customer: {} });

    return store.dispatch(actions.fetchCustomerInfo() as any).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates GET_CUSTOMER_INFO_FAILURE when fetching customer info fails', () => {
    const errorMessage = 'Network Error';
    mockedAxios.get.mockRejectedValue(new Error(errorMessage));

    const expectedActions = [
      { type: GET_CUSTOMER_INFO_REQUEST },
      { type: GET_CUSTOMER_INFO_FAILURE, payload: errorMessage }
    ];

    const store = mockStore({ customer: {} });

    return store.dispatch(actions.fetchCustomerInfo() as any).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
