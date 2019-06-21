import React from 'react';
import classes from './CheckoutSummary.css';
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";

const CheckoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>Hope it tastes good!</h1>
      <div style={{width: '100%', margin: 'auto'}}>
        <Burger ingredients={props.ingredients}/>
      </div>
      <Button
        clicked={props.checkoutCanceled}
        btnType={'Danger'}
      >
        CANCEL
      </Button>
      <Button
        clicked={props.checkoutContinued}
        btnType={'Success'}
      >
        CONTINUE
      </Button>
    </div>
  );
};

export default CheckoutSummary;
