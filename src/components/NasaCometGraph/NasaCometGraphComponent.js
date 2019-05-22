import React from 'react';
import D3BubbleChart from './D3BubbleChart';
import Container from '../common/Container';

const NasaCometGraphComponent = () => {
  return (
    <Container
      containerTitle="Nasa comet data"
      component={<D3BubbleChart width={1300} height={900} />}
    />
  );
};

export default NasaCometGraphComponent;
