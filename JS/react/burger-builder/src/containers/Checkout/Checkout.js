import React from 'react';
import { connect } from "react-redux";

import { Route } from 'react-router-dom';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

const  Checkout = (props)=>{
  const checkoutCanceledHandler = () => {
    props.history.goBack();
  };

  const checkoutContinuedHandler = () => {
    props.history.replace('/checkout/contact-data');
  };
  return (
    <div>
      <CheckoutSummary
        checkoutCanceled={checkoutCanceledHandler}
        checkoutContinued={checkoutContinuedHandler}
        ingredients={props.ings}
      />
      <Route
        path={props.match.url + '/contact-data'}
        component={ContactData}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
  };
};

export default connect(mapStateToProps,)(Checkout);
