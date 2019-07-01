import React from 'react';

import classes from './Auth.css';

import Input from "../../components/UI/Input/Input";
import SuccessButton from "../../components/UI/Button/SuccessButton";
import {connect} from "react-redux";
import {auth, setAuthRedirect} from '../../store/actions'
import DangerButton from "../../components/UI/Button/DangerButton";
import Spinner from "../../components/UI/Spinner/Spinner";
import {Redirect} from "react-router-dom";
import checkValidity from "../../util/checkValidity";

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      controls: {
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
      },
      formIsValid: false,
      isSignUp: false,
    };
  };

  componentDidMount() {
    if (!this.props.building && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirect();
    }
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp,
    );
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.controls
    };
    const updatedFromElement = {
      ...updatedOrderForm[inputIdentifier]
    };

    updatedFromElement.value = event.target.value;
    updatedFromElement.valid = checkValidity(event.target.value, updatedFromElement.validation);
    updatedOrderForm[inputIdentifier] = updatedFromElement;

    let formIsValid = true;
    for (let input in updatedOrderForm) {
      formIsValid = updatedOrderForm[input].valid && formIsValid;
    }

    this.setState({controls: updatedOrderForm, formIsValid: formIsValid} );
  };

  switchAuthModeHandler = () =>{
    this.setState({isSignUp: !this.state.isSignUp})
  };

  render() {

    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }
    let form = formElementsArray.map((elem) => (
      <Input
        changed={(event) => this.inputChangedHandler(event,elem.id)}
        invalid={!elem.config.valid}
        key={elem.id}
        elementType={elem.config.elementType}
        elementConfig={elem.config.elementConfig}
        value={elem.config.value}
      />
    ));

    if (this.props.loading) {
      form = <Spinner/>;
    }

    const errorMessage = this.props.error ? <p>{this.props.error.message}</p> : null;

    if (this.props.isAuthenticated) {
      console.log('Authenticated, redirecting', this.props.authRedirectPath);
      return (
        <Redirect to={this.props.authRedirectPath} />
      )
    }
    return (
      <div className={classes.Auth}>
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <SuccessButton
            disabled={!this.state.formIsValid}
          >
            SUBMIT
          </SuccessButton>
        </form>
        <DangerButton
          clicked={this.switchAuthModeHandler}
        >
          SWITCH TO {this.state.isSignUp ? 'SIGN IN': 'SIGN UP'}
        </DangerButton>
      </div>
    )
  }
}

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
