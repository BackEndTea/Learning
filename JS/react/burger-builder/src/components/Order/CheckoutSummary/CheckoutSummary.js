import React from 'react';
import classes from './CheckoutSummary.css';
import Burger from "../../Burger/Burger";
import SuccessButton from "../../UI/Button/SuccessButton";
import DangerButton from "../../UI/Button/DangerButton";

const CheckoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>Hope it tastes good!</h1>
      <div style={{width: '100%', margin: 'auto'}}>
        <Burger ingredients={props.ingredients}/>
      </div>
      <DangerButton
        clicked={props.checkoutCanceled}
      >
        CANCEL
      </DangerButton>
      <SuccessButton
        clicked={props.checkoutContinued}
      >
        CONTINUE
      </SuccessButton>
    </div>
  );
};

export default CheckoutSummary;
