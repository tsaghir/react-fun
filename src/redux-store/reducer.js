import { DATA_LOAD_SUCCESS, DO_DATA_POLLING } from './actions';

const initialState = {
  locationData: [],
  doDataPolling: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_LOAD_SUCCESS:
      return {
        ...state,
        locationData: action.data,
      };

    case DO_DATA_POLLING:
      return {
        ...state,
        doDataPolling: !action.doDataPolling,
      };

    default:
      return state;
  }
};

export default reducer;
