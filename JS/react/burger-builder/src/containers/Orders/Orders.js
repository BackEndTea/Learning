import React from 'react';

import axios from '../../axios-orders';
import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";


class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      loading: true,
    }
  }

  componentDidMount() {
    axios.get('/orders.json')
      .then((res) => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push( {
            ...res.data[key],
            id: key
          });
        }
        this.setState({
          loading: false,
          orders: fetchedOrders
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({loading: false});
      });
  }

  render() {
    let content = this.state.orders.map((order) => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={+order.price}
      />
    ));
    if (this.state.loading) {
      content = <Spinner/>;
    }
    return (
      <div>
        {content}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
