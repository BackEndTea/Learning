import React from 'react';
import classes from './Order.css';

const Order = (props) => {
  const ingredients= [];

  for (let ingredient in props.ingredients) {
    ingredients.push({
      name: ingredient,
      amount: props.ingredients[ingredient]
    });
  }

  const ingredientOutput = ingredients.map(ig => {
      return <span
        style={{
          textTransform: 'capitalize',
          display: 'inline-block',
          margin: '0 8px',
          border: '1px solid #ccc',
          boxShadow: '1px 1px 3px #eee',
          padding: '5px',
        }}
        key={ig.name}
      >
        {ig.name} ({ig.amount})
      </span>
    }
  );
  return (
    <div className={classes.Order}>
      Ingredients: {ingredientOutput}
      <p>Price: {props.price.toFixed(2)}</p>

    </div>
  );
};

export default Order;
