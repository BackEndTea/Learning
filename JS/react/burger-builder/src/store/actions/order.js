import * as actionTypes from './actionTypes';
import axios from '../../axios-orders'

const purchaseBurgerSuccess = (id,orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  }
};

const purchaseBurgerFail= (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  }
};

export const purchaseBurgerStart = (orderData, token) => {
  return (dispatch) => {
    axios.post('/orders.json?auth=' + token,orderData)
      .then((response) => {
        dispatch(purchaseBurgerSuccess(response.data.name,orderData))
      })
      .catch((error) => {
        dispatch(purchaseBurgerFail(error))
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};

const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error,
  };
};

const fetchOrderStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
};

export const fetchOrders = (token, userId) =>  {
  return (dispatch) => {
    dispatch(fetchOrderStart());

    axios.get(`/orders.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`)
      .then((res) => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push( {
            ...res.data[key],
            id: key
          });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch((error) => {
        console.log(error);
        dispatch(fetchOrdersFail(error));
      });
  }
};
