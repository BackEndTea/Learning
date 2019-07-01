import React, { useState } from 'react';
import classes from './Layout.css';
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import {connect} from "react-redux";

const Layout = (props) => {
  const [showSideDrawer, setSideDrawer] = useState(false);

  const sideDrawerClosedHandler = () => {
    setSideDrawer(false);
  };

  const sideDrawerToggleHandler = () => {
    setSideDrawer(!showSideDrawer);
  };

  return (
    <React.Fragment>
      <Toolbar
        drawerToggleClicked={sideDrawerToggleHandler}
        isAuth={props.isAuthenticated}
      />
      <SideDrawer
        open={showSideDrawer}
        closed={sideDrawerClosedHandler}
        isAuth={props.isAuthenticated}
      />
      <main className={classes.Content}>
        {props.children}
      </main>
    </React.Fragment>
  )
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  }
};

export default connect(mapStateToProps)(Layout);
