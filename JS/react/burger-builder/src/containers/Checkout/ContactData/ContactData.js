import React, { useState } from 'react';
import classes from './ContactData.css'
import axios from '../../../axios-orders';

import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { purchaseBurgerStart } from "../../../store/actions";
import SuccessButton from "../../../components/UI/Button/SuccessButton";
import checkValidity from "../../../util/checkValidity";

const ContactData = (props) => {

  const [formIsValid, setFormValidity] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your Name'
      },
      validation: {
        required: true,
      },
      valid: false,
      value: '',
    },
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Your Email'
      },
      validation: {
        required: true,
      },
      valid: false,
      value: '',
    },
    street: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your Street'
      },
      validation: {
        required: true,
      },
      valid: false,
      value: '',
    },
    postalCode: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your Postal Code'
      },
      validation: {
        required: true,
        minLength: 6,
        maxLength: 6,
      },
      valid: false,
      value: '',
    },
    deliveryMethod: {
      elementType: 'select',
      elementConfig: {
        options: [
          {value: 'fastest', displayValue: 'Fastest'},
          {value: 'cheapest', displayValue: 'Cheapest'},
        ]
      },
      validation: {
        required: true,
      },
      valid: true,
      value: 'fastest'
    }
  });

  const orderHandler = (event) => {
    event.preventDefault();
    const formData = {};

    for (let formElem in orderForm) {
      formData[formElem] = orderForm[formElem].value
    }

    const order = {
      ingredients: props.ingredients,
      price: props.price,
      orderData: formData,
      userId: props.userId,
    };

    props.onOrderBurger(order, props.token);
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...orderForm
    };
    const updatedFromElement = {
      ...updatedOrderForm[inputIdentifier]
    };

    updatedFromElement.value = event.target.value;
    updatedFromElement.valid = checkValidity(event.target.value, updatedFromElement.validation);
    updatedOrderForm[inputIdentifier] = updatedFromElement;

    let formIsValid = true;
    for (let input in updatedOrderForm) {
      formIsValid = updatedOrderForm[input].valid && formIsValid;
    }
    setOrderForm(updatedOrderForm);
    setFormValidity(formIsValid);
  };

  const formElementsArray = [];
  for (let key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key],
    });
  }
  let form = (
    <form onSubmit={orderHandler}>
      {formElementsArray.map((elem) => (
        <Input
          changed={(event) => inputChangedHandler(event,elem.id)}
          invalid={!elem.config.valid}
          key={elem.id}
          elementType={elem.config.elementType}
          elementConfig={elem.config.elementConfig}
          value={elem.config.value}
        />
      ))}
      <SuccessButton disabled={!formIsValid} clicked={orderHandler}>ORDER</SuccessButton>
    </form>
  );

  if (props.loading) {
    form = <Spinner/>;
  }
  return (
    <div className={classes.ContactData}>
      <h4>Enter your Contact Data</h4>
      {form}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token)=> dispatch(purchaseBurgerStart(orderData, token))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
