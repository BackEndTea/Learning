import React from 'react';
import Button from "../../UI/Button/Button";
import SuccessButton from "../../UI/Button/SuccessButton";
import DangerButton from "../../UI/Button/DangerButton";

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
      <DangerButton
        clicked={props.purcacheCanceled}
      >
        CANCEL
      </DangerButton>
      <SuccessButton
        clicked={props.purchaceContinued}
      >
        CONTINUE
      </SuccessButton>
    </React.Fragment>
  );
};

export default OrderSummary;
