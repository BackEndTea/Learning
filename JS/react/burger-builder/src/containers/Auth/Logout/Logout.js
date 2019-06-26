import React from 'react';
import { Redirect } from 'react-router-dom';

import {logOut} from "../../../store/actions";
import {connect} from "react-redux";

class Logout extends React.Component {
  componentDidMount() {
    this.props.onLogout();
  }

  render() {
    return (<Redirect to="/"/>);
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(logOut()),
  }
};

export default connect(null, mapDispatchToProps)(Logout);
