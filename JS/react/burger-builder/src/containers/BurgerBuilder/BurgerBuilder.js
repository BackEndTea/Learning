import React from 'react';
import { connect } from 'react-redux';

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from "../../store/actions";

class BurgerBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      purchasing: false,
      loading: false,
      error: false,
    };
  }

  componentDidMount() {
    // axios.get('/ingredients.json')
    //   .then(response => {
    //     const ingredients = response.data;
    //     this.setState({ingredients: ingredients});
    //     this.isPurchasable(ingredients)
    //   }).catch(() => {
    //     this.setState({error: true});
    // });
  }

  isPurchasable() {
    const sum = Object.keys(this.props.ings).reduce((sum,key) => sum + this.props.ings[key], 0);
    return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  };

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  };

  purchaseContinueHandler = () => {
    this.props.history.push( '/checkout');
  };

  render() {
    const disableInfo = {...this.props.ings};

    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    let summary = null;
    let burger = this.state.error ? <p>Unable to load ingredients!</p> : <Spinner/>;

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
        />
      </React.Fragment>;

      summary = <OrderSummary
        purcacheCanceled={this.purchaseCancelHandler}
        purchaceContinued={this.purchaseContinueHandler}
        ingredients={this.props.ings}
        price={this.props.price}
      />;
    }

    if (this.state.loading) {
      summary = <Spinner/>;
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
    ings: state.ingredients,
    price: state.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch({
      type: actionTypes.ADD_INGREDIENT,
      ingredientName: ingName
    }),
    onIngredientRemoved: (ingName) => dispatch({
      type: actionTypes.REMOVE_INGREDIENT,
      ingredientName: ingName
    }),

  }
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
