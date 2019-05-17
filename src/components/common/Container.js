import React from 'react';
import Title from './Title';
import {
  containerStyle,
  containerTitleStyle,
  containerContentStyle,
  containerFooterStyle,
} from '../../style/containerStyles';

const Container = ({
  containerTitle,
  withFooter,
  component: Component,
  buttons,
}) => {
  return (
    <div className={containerStyle}>
      <Title
        titleText={containerTitle}
        textSize={25}
        cx={containerTitleStyle}
      />
      <div className={containerContentStyle}>
        <Component />
      </div>
      {withFooter && (
        <div className={containerFooterStyle}>{buttons.map(item => item)}</div>
      )}
    </div>
  );
};

export default Container;
