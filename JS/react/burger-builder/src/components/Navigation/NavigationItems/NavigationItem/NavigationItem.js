import React from 'react';
import { Link } from 'react-router-dom';

import classes from './NavigationItem.css'

const NavigationItem = props => (
  <li className={classes.NavigationItem}>
    <Link
      className={props.active ? classes.active: null}
      to={props.link}
    >
      {props.children}
    </Link>
  </li>
);

export default NavigationItem;
