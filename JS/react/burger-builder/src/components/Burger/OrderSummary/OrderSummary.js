import React from 'react';
import Button from "../../UI/Button/Button";

const OrderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients)
    .map((key) => {
      return <li key={key}>
        <span
          style={{textTransform: 'capitalize'}}
        >
          {key}
        </span>
        : {props.ingredients[key]}
      </li>
    });
  return (
    <React.Fragment>
      <h3>Your Order</h3>
      <p>
        The burger has the following ingredients:
      </p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Price: {props.price.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>
      <Button
        clicked={props.purcacheCanceled}
        btnType="Danger"
      >
        CANCEL
      </Button>
      <Button
        clicked={props.purchaceContinued}
        btnType="Success"
      >
        CONTINUE
      </Button>
    </React.Fragment>
  );
};

export default OrderSummary;
