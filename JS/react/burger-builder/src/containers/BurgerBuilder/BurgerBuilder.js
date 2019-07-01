import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {addIngredient, purchaseInit, removeIngredient, setAuthRedirect} from "../../store/actions/";
import { initIngredients } from "../../store/actions/burgerBuilder";

export const BurgerBuilder = (props) => {

  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    props.onInitIngredients();
    // eslint-disable-next-line
  }, []);


  const isPurchasable = () => {
    const sum = Object.keys(props.ings).reduce((sum,key) => sum + props.ings[key], 0);
    return sum > 0;
  };

  const purchaseHandler = () => {
    if (props.isAuthenticated) {
      setPurchasing(true);
      return;
    }
    props.onSetAuthRedirect('/checkout');
    props.history.push('/auth');
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    props.onInitPurchase();
    props.history.push('/checkout');
  };

  const disableInfo = {...props.ings};

  for (let key in disableInfo) {
    disableInfo[key] = disableInfo[key] <= 0;
  }
  let summary = null;
  let burger = props.error ? <p>Unable to load ingredients!</p> : <Spinner/>;

  if(props.ings) {
    burger = <React.Fragment>
      <Burger ingredients={props.ings}/>
      <BuildControls
        price={props.price}
        ingredientAdded={props.onIngredientAdded}
        ingredientRemoved={props.onIngredientRemoved}
        disableInfo={disableInfo}
        purchasable={isPurchasable()}
        ordered={purchaseHandler}
        isAuth={props.isAuthenticated}
      />
    </React.Fragment>;

    summary = <OrderSummary
      purcacheCanceled={purchaseCancelHandler}
      purchaceContinued={purchaseContinueHandler}
      ingredients={props.ings}
      price={props.price}
    />;
  }

  return (
    <React.Fragment>
      <Modal
        modalClosed={purchaseCancelHandler}
        show={purchasing}
      >
        {summary}
      </Modal>
      {burger}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(removeIngredient(ingName)),
    onInitIngredients: () => dispatch(initIngredients()),
    onInitPurchase: () => dispatch(purchaseInit()),
    onSetAuthRedirect: (path) => dispatch(setAuthRedirect(path)),
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
