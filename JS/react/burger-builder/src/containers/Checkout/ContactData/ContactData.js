import React from 'react';
import classes from './ContactData.css'
import axios from '../../../axios-orders';

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name:'',
      email: '',
      address: {
        street: '',
        postalCode: '',
      },
      loading: false,
    };
  }

  orderHandler = (event) => {
    this.setState({loading: true});
    event.preventDefault();
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Gert',
        address: {
          street: 'Streetname  420',
          zipCode: '1234AB',
        },
        email: 'foo@bar.com'
      },
      deliveryMethod: 'slow'
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

  render() {
    let form = (
      <form>
      <input className={classes.Input} type="text" name="name" placeholder="Your name"/>
      <input className={classes.Input} type="email" name="email" placeholder="Your email"/>
      <input className={classes.Input} type="text" name="street" placeholder="Your street"/>
      <input className={classes.Input} type="text" name="postalCode" placeholder="Your postal code"/>
      <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
    </form>);
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
