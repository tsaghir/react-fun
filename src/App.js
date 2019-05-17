import React from 'react';
import { Navbar, ISSPositionComponent } from './components';

const App = () => {
  return (
    <div>
      <Navbar navTitle="ISS space station 🚀" />
      <ISSPositionComponent />
    </div>
  );
};

export default App;
