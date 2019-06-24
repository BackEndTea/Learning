import React from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends React.Component {
  state= {
    ingredients: {
      salad: 0,
      meat: 0,
      cheese: 0,
      bacon: 0,
    },
    totalPrice: 0
  };
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let param of query.entries()) {
      if (param[0] === 'price') {
        this.setState({ totalPrice: param[1]});
        continue;
      }
      ingredients[param[0]] = +param[1];
    }
    this.setState({ingredients: ingredients})
  }

  checkoutCanceledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          checkoutCanceled={this.checkoutCanceledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
          ingredients={this.state.ingredients}
        />
        <Route
          path={this.props.match.url + '/contact-data'}
          render={(props) => <ContactData
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            {...props}
          />}
        />
      </div>
    );
  }
}

export default Checkout;
