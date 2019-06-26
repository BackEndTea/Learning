import React from 'react';
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

class BurgerBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      purchasing: false,
    };
  }

  componentDidMount() {
    this.props.onInitIngredients();
  }

  isPurchasable() {
    const sum = Object.keys(this.props.ings).reduce((sum,key) => sum + this.props.ings[key], 0);
    return sum > 0;
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({purchasing: true});
      return;
    }
    this.props.onSetAuthRedirect('/checkout');
    this.props.history.push('/auth');
  };

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  };

  render() {
    const disableInfo = {...this.props.ings};

    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    let summary = null;
    let burger = this.props.error ? <p>Unable to load ingredients!</p> : <Spinner/>;

    if(this.props.ings) {
      burger = <React.Fragment>
        <Burger ingredients={this.props.ings}/>
        <BuildControls
          price={this.props.price}
          ingredientAdded={this.props.onIngredientAdded}
          ingredientRemoved={this.props.onIngredientRemoved}
          disableInfo={disableInfo}
          purchasable={this.isPurchasable()}
          ordered={this.purchaseHandler}
          isAuth={this.props.isAuthenticated}
        />
      </React.Fragment>;

      summary = <OrderSummary
        purcacheCanceled={this.purchaseCancelHandler}
        purchaceContinued={this.purchaseContinueHandler}
        ingredients={this.props.ings}
        price={this.props.price}
      />;
    }

    return (
      <React.Fragment>
        <Modal
          modalClosed={this.purchaseCancelHandler}
          show={this.state.purchasing}
        >
          {summary}
        </Modal>
        {burger}
      </React.Fragment>
    );
  }
}

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
