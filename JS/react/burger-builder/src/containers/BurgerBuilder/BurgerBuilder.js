import React from 'react';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: null,
      totalPrice: 4,
      purchasable: false,
      purchasing: false,
      loading: false,
      error: false,
    };
  }

  componentDidMount() {
    axios.get('/ingredients.json')
      .then(response => {
        const ingredients = response.data;
        this.setState({ingredients: ingredients});
        this.updatePurchaseState(ingredients)
      }).catch(() => {
        this.setState({error: true});
    });
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients).reduce((sum,key) => sum + ingredients[key], 0);
    this.setState({purchasable: sum > 0});
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const ingredients = {...this.state.ingredients};
    ingredients[type] = oldCount + 1;
    const oldprice = this.state.totalPrice;
    this.setState({totalPrice: oldprice + INGREDIENT_PRICES[type], ingredients});
    this.updatePurchaseState(ingredients)
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount === 0) {
      return;
    }
    const ingredients = {...this.state.ingredients};
    ingredients[type] = oldCount - 1;
    const oldprice = this.state.totalPrice;
    this.setState({totalPrice: oldprice - INGREDIENT_PRICES[type], ingredients});
    this.updatePurchaseState(ingredients)

  };

  purchaseHandler = () => {
    this.setState({purchasing: true});
  };

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  };

  purchaseContinueHandler = () => {
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
        '=' +
        encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryParams.push('price=' + this.state.totalPrice);

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryParams.join('&'),
    });
  };

  render() {
    const disableInfo = {...this.state.ingredients};

    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    let summary = null;
    let burger = this.state.error ?<p>Unable to load ingredients!</p>: <Spinner/>;

    if(this.state.ingredients) {
      burger = <React.Fragment>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          price={this.state.totalPrice}
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disableInfo={disableInfo}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
        />
      </React.Fragment>;

      summary = <OrderSummary
        purcacheCanceled={this.purchaseCancelHandler}
        purchaceContinued={this.purchaseContinueHandler}
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);
