import React from 'react';
import classes from './NavigationItems.css'
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem
      link={'/'}
      exact={true}
    >
      Burger Builder
    </NavigationItem>
    {props.isAuth ?
      <NavigationItem
        link={'/orders'}
        exact={false}
      >
        Orders
      </NavigationItem>
      : null
    }
    {props.isAuth
      ?
      <NavigationItem
        link={'/logout'}
      >
        Log Out
      </NavigationItem>
      :
      <NavigationItem
        link={'/auth'}
        exact={false}
      >
        Authenticate
      </NavigationItem>
    }

  </ul>
);

export default NavigationItems;
