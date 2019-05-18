import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

const configureStore = initialState => {
  return createStore(reducer, initialState, compose(applyMiddleware(thunk)));
};

export default configureStore;
