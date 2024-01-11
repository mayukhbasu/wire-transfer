import { useDispatch as useReduxDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { RootState } from '../reducers';

// Define a custom useDispatch hook that knows about thunks
export const useDispatch = () => useReduxDispatch<ThunkDispatch<RootState, void, AnyAction>>();
