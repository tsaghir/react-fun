import React from 'react';
import {
  Navbar,
  Title,
  Container,
  Button,
  ISSPositionComponent,
} from './components';

const App = () => {
  return (
    <div>
      <Navbar navTitle="ISS space station 🚀" />
      <Title titleText="1. zadatak" />
      <ISSPositionComponent />
    </div>
  );
};

export default App;
