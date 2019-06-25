import React from 'react';
import classes from './ContactData.css'
import axios from '../../../axios-orders';

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";

class ContactData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderForm: {
        name: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your Name'
          },
          validation: {
            required: true,
          },
          valid: false,
          value: '',
        },
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
        street: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your Street'
          },
          validation: {
            required: true,
          },
          valid: false,
          value: '',
        },
        postalCode: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your Postal Code'
          },
          validation: {
            required: true,
            minLength: 6,
            maxLength: 6,
          },
          valid: false,
          value: '',
        },
        deliveryMethod: {
          elementType: 'select',
          elementConfig: {
            options: [
              {value: 'fastest', displayValue: 'Fastest'},
              {value: 'cheapest', displayValue: 'Cheapest'},
            ]
          },
          validation: {
            required: true,
          },
          valid: true,
          value: 'fastest'
        }
      },
      loading: false,
      formIsValid: false,
    };
  }

  checkValidity (value, rules) {
    let isValid = true;

    if (!rules) {
      return true;
    }

    if(rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.minLength && isValid;
    }

    return isValid;
  }

  orderHandler = (event) => {
    this.setState({loading: true});
    event.preventDefault();
    const formData = {};

    for (let formElem in this.state.orderForm) {
      formData[formElem] = this.state.orderForm[formElem].value
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
    };

    axios.post('/orders.json',order)
      .then(() => {
        this.setState({loading: false});
        this.props.history.push('/');
      })
      .catch((error) => {
        console.log(error);
        this.setState({loading: false});
      });
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    const updatedFromElement = {
      ...updatedOrderForm[inputIdentifier]
    };

    updatedFromElement.value = event.target.value;
    updatedFromElement.valid = this.checkValidity(event.target.value, updatedFromElement.validation);
    updatedOrderForm[inputIdentifier] = updatedFromElement;

    let formIsValid = true;
    for (let input in updatedOrderForm) {
      formIsValid = updatedOrderForm[input].valid && formIsValid;
    }

    this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid} );
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((elem) => (
          <Input
            changed={(event) => this.inputChangedHandler(event,elem.id)}
            invalid={!elem.config.valid}
            key={elem.id}
            elementType={elem.config.elementType}
            elementConfig={elem.config.elementConfig}
            value={elem.config.value}
          />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.orderHandler}>ORDER</Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner/>;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    price: state.totalPrice,
  };
};

export default connect(mapStateToProps)(ContactData);
