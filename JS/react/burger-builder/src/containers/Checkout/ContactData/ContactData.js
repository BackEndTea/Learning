import React from 'react';
import classes from './ContactData.css'
import axios from '../../../axios-orders';

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

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
          value: ''
        },
        email: {
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'Your Email'
          },
          value: ''
        },
        street: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your Street'
          },
          value: ''
        },
        postalCode: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your Postal Code'
          },
          value: ''
        },
        deliveryMethod: {
          elementType: 'select',
          elementConfig: {
            options: [
              {value: 'fastest', displayValue: 'Fastest'},
              {value: 'cheapest', displayValue: 'Cheapest'},
            ]
          },
          value: 'fastest'
        }
      },
      loading: false,
    };
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
    updatedOrderForm[inputIdentifier] = updatedFromElement;

    this.setState({orderForm: updatedOrderForm} );
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
            key={elem.id}
            elementType={elem.config.elementType}
            elementConfig={elem.config.elementConfig}
            value={elem.config.value}
          />
        ))}
        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
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

export default ContactData;
