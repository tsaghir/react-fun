import React from 'react';
import Title from './Title';
import {
  containerStyle,
  containerTitleStyle,
  containerContentStyle,
  containerFooterStyle,
} from '../../style/containerStyles';

const Container = ({ containerTitle, withFooter, component, buttons, cx }) => {
  return (
    <div className={`${containerStyle} ${cx}`}>
      <Title
        titleText={containerTitle}
        textSize={25}
        cx={containerTitleStyle}
      />
      <div className={containerContentStyle}>{component}</div>
      {withFooter && (
        <div className={containerFooterStyle}>{buttons.map(item => item)}</div>
      )}
    </div>
  );
};

export default Container;
