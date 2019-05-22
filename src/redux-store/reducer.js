import { DATA_LOAD_SUCCESS, DO_DATA_POLLING, LOCATION } from './actions';

const initialState = {
  locationData: [],
  doDataPolling: false,
  currentLocation: {
    latitude: null,
    longitude: null,
  },
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

    case LOCATION:
      return {
        ...state,
        currentLocation: action.currentLocation,
      };

    default:
      return state;
  }
};

export default reducer;
