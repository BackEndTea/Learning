import React from 'react';
import logo from '../../assets/images/burger-logo.png'
import classes from './Logo.css'

const Logo = props => (
  <div className={classes.Logo}>
    <img src={logo} alt="burgerLogo" />
  </div>
);

export default Logo;
