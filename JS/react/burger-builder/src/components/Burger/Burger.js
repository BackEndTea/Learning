import React from 'react';
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from './Burger.css'

const Burger = props => {
  let transFromedIngredients = Object.keys(props.ingredients)
    .map((ingredientKey) =>
      [...Array(props.ingredients[ingredientKey])]
        .map((_, i) => (<BurgerIngredient key={ingredientKey + " " +i} type={ingredientKey}/>))
    ).reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  if (transFromedIngredients.length === 0) {
    transFromedIngredients = <p>Please start by adding ingredients!</p>
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top"/>
      {transFromedIngredients}
      <BurgerIngredient type="bread-bottom"/>
    </div>
  );
};

export default Burger;
