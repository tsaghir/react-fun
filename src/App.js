import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './redux-store/storeConfiguration';
import { Navbar, ISSPositionComponent } from './components';

const App = () => {
  const reduxStore = configureStore();

  return (
    <div>
      <Provider store={reduxStore}>
        <Navbar navTitle="ISS space station 🚀" />
        <ISSPositionComponent />
      </Provider>
    </div>
  );
};

export default App;
