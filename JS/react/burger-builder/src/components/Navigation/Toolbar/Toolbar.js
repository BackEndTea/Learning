import React from 'react';
import classes from './Toolbar.css';
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
import {NavLink} from "react-router-dom";

const Toolbar = props => (
  <header className={classes.Toolbar}>
    <DrawerToggle clicked={props.drawerToggleClicked}/>
    <div className={classes.Logo}><NavLink to="/"><Logo/></NavLink></div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems
        isAuth={props.isAuth}
      />
    </nav>
  </header>
);

export default Toolbar;
