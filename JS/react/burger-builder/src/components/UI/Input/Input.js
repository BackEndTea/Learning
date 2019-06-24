import React from 'react';
import classes from './Input.css'

const Input = (props) => {
  let inputElement;
  switch(props.elementType) {
    case 'input':
      inputElement = <input
        className={classes.InputElement}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}
      />;
      break;
    case 'textArea':
      inputElement = <textarea
        className={classes.InputElement}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}
      />;
      break;
    case 'select':
      inputElement = <select
        className={classes.InputElement}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}
        >
        {props.elementConfig.options.map((el) => (
          <option
            key={el.value}
            value={el.value}
          >
            {el.displayValue}
          </option>
        ))}
      </select>;
      break;
    default:
      inputElement = <input
        className={classes.InputElement}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}
      />;
  }
  return (
    <div className={classes.Input} >
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
