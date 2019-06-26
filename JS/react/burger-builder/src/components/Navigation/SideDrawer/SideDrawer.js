import React from 'react';
import classes from './SideDrawer.css'
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";

const SideDrawer = props => {
  const attachedClasses = [classes.SideDrawer, props.open ? classes.Open : classes.Closed];

  return (
    <React.Fragment>
      <Backdrop
        show={props.open}
        clicked={props.closed}
      />
      <div className={attachedClasses.join(' ') }>
        <div className={classes.Logo}>
          <Logo/>
        </div>
        <nav>
          <NavigationItems
            isAuth={props.isAuth}
          />
        </nav>
      </div>
    </React.Fragment>
  )
};

export default SideDrawer;
