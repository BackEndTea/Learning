import React from 'react';
import classes from './NavigationItems.css'
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem
      link={'/'}
      exact={true}
    >
      Burger Builder
    </NavigationItem>
    <NavigationItem
      link={'/orders'}
      exact={false}
    >
      Orders
    </NavigationItem>
  </ul>
);

export default NavigationItems;
