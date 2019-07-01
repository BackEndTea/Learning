import React, { useEffect } from 'react';

import axios from '../../axios-orders';
import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import {fetchOrders} from "../../store/actions";
import {connect} from "react-redux";


const Orders  = (props) => {
  useEffect(() => {
    props.onFetchOrders(props.token, props.userId);
  }, []);

  let content = props.orders.map((order) => (
    <Order
      key={order.id}
      ingredients={order.ingredients}
      price={+order.price}
    />
  ));
  if (props.loading) {
    content = <Spinner/>;
  }
  return (
    <div>
      {content}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.order.loading,
    orders: state.order.orders,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token, userId) => dispatch(fetchOrders(token, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
