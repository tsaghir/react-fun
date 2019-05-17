import React from 'react';
import { navStyle, navTitleStyle } from '../../style/navbarStyles';

const Navbar = ({ navTitle }) => {
  return (
    <nav className={navStyle}>
      <div className={navTitleStyle}>{navTitle}</div>
    </nav>
  );
};

export default Navbar;
