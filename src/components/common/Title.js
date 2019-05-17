import React from 'react';
import { titleStyle } from '../../style/commonStyles';

const Title = ({ titleText, textSize = 35, cx }) => {
  return <div className={`${titleStyle(textSize)} ${cx}`}>{titleText}</div>;
};

export default Title;
