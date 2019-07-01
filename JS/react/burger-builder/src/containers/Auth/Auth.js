import React, { useEffect, useState } from 'react';

import classes from './Auth.css';

import Input from "../../components/UI/Input/Input";
import SuccessButton from "../../components/UI/Button/SuccessButton";
import {connect} from "react-redux";
import {auth, setAuthRedirect} from '../../store/actions'
import DangerButton from "../../components/UI/Button/DangerButton";
import Spinner from "../../components/UI/Spinner/Spinner";
import {Redirect} from "react-router-dom";
import checkValidity from "../../util/checkValidity";

const defaultControls = {
  email: {
    elementType: 'input',
    elementConfig: {
      type: 'email',
      placeholder: 'Your Email'
    },
    validation: {
      required: true,
    },
    valid: false,
    value: '',
  },
  password: {
    elementType: 'input',
    elementConfig: {
      type: 'password',
      placeholder: 'Your Password'
    },
    validation: {
      required: true,
      minLength: 7,
    },
    valid: false,
    value: '',
  },
};

const Auth = (props) => {
  const [formIsValid, setFormValidity] = useState(false);
  const [isSignUp, setSignUp] = useState(false);
  const [controls, setControls] = useState(defaultControls);

  useEffect(() => {
    if (props.building && props.authRedirectPath !== '/') {
      props.onSetAuthRedirect();
    }
  });

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAuth(
      controls.email.value,
      controls.password.value,
      isSignUp,
    );
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...controls
    };
    const updatedFromElement = {
      ...updatedOrderForm[inputIdentifier]
    };

    updatedFromElement.value = event.target.value;
    updatedFromElement.valid = checkValidity(event.target.value, updatedFromElement.validation);
    updatedOrderForm[inputIdentifier] = updatedFromElement;

    let formIsValidCheck = true;
    for (let input in updatedOrderForm) {
      formIsValidCheck = updatedOrderForm[input].valid && formIsValidCheck;
    }
    setControls(updatedOrderForm);
    setFormValidity(formIsValidCheck);
  };

  const switchAuthModeHandler = () =>{
    setSignUp(!isSignUp);
  };

  const formElementsArray = [];
  for (let key in controls) {
    formElementsArray.push({
      id: key,
      config: controls[key],
    });
  }
  const form = props.loading ? <Spinner/>: formElementsArray.map((elem) => (
    <Input
      changed={(event) => inputChangedHandler(event,elem.id)}
      invalid={!elem.config.valid}
      key={elem.id}
      elementType={elem.config.elementType}
      elementConfig={elem.config.elementConfig}
      value={elem.config.value}
    />
  ));

  if (props.isAuthenticated) {
    return (
      <Redirect to={props.authRedirectPath} />
    )
  }
  return (
    <div className={classes.Auth}>
      {props.error ? <p>{props.error.message}</p> : null}
      <form onSubmit={submitHandler}>
        {form}
        <SuccessButton
          disabled={!formIsValid}
        >
          SUBMIT
        </SuccessButton>
      </form>
      <DangerButton
        clicked={switchAuthModeHandler}
      >
        SWITCH TO {isSignUp ? 'SIGN IN': 'SIGN UP'}
      </DangerButton>
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    building: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(auth(email, password, isSignUp)),
    onSetAuthRedirect: () => dispatch(setAuthRedirect('/')),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
