import React from 'react';
import classes from './Button.css';
import Button from "./Button";

const DangerButton = props => (
  <Button
    btnType={'Danger'}
    {...props}
  >
    {props.children}
  </Button>
);

export default DangerButton;
