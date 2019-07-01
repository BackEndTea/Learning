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
      <React.Fragment>
        <NavigationItem
          link={'/orders'}
          exact={false}
        >
          Orders
        </NavigationItem>

        <NavigationItem
          link={'/logout'}
        >
          Log Out
        </NavigationItem>
      </React.Fragment>
      : <NavigationItem
        link={'/auth'}
        exact={false}
      >
        Authenticate
      </NavigationItem>
    }
  </ul>
);

export default NavigationItems;
