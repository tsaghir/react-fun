import React from 'react';
import Button from './common/Button';
import Container from './common/Container';

const ISSPositionComponent = () => {
  const component = () => {
    return <div>CONTENTTT</div>;
  };

  const buttons = [
    <Button key="1" buttonText="Refresh" />,
    <Button key="2" buttonText="Auto sync" />,
  ];

  return (
    <Container
      containerTitle="ISS position 🌍"
      component={component}
      withFooter
      buttons={buttons}
    />
  );
};

export default ISSPositionComponent;
