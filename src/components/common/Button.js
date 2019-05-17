import React from 'react';
import { buttonStyle, textStlye } from '../../style/buttonStyles';

const Button = props => {
  const { buttonText, onClick } = props;
  return (
    <button type="button" onClick={onClick} className={buttonStyle}>
      <span className={textStlye}>{buttonText}</span>
    </button>
  );
};

export default Button;
