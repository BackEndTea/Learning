import React from 'react';
import { connect } from "react-redux";

import {Redirect, Route} from 'react-router-dom';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

const Checkout = (props) => {
  const checkoutCanceledHandler = () => {
    props.history.goBack();
  };

  const checkoutContinuedHandler = () => {
    props.history.replace('/checkout/contact-data');
  };

  let summary= <Redirect to="/" />;
  if (props.ingredients) {
    const purchasedRedirect = props.purchased ? <Redirect to="/"/>: null;
    summary = (<React.Fragment>
      {purchasedRedirect}
      <CheckoutSummary
        checkoutCanceled={checkoutCanceledHandler}
        checkoutContinued={checkoutContinuedHandler}
        ingredients={props.ingredients}
      />
      <Route
        path={props.match.url + '/contact-data'}
        component={ContactData}
      />
    </React.Fragment>);
  }
  return (
    <div>
      {summary}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
