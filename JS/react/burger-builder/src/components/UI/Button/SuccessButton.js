import React from 'react';
import Button from "./Button";

const SuccessButton = props => (
  <Button
    btnType={'Success'}
    {...props}
  >
    {props.children}
  </Button>
);

export default SuccessButton;
