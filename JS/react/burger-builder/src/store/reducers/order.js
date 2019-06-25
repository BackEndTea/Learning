import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const initPurchase = (state) => {
  return {
    ...state,
    purchased: false
  };
};

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = {
    ...action.orderData,
    id: action.orderId
  };
  return {
    ...state,
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder)
  };
};

const purchaseBurgerFail = (state) => {
  return {
    ...state,
    loading: false,
  };
};

const fetchOrdersStart = (state) => {
  return {
    ...state,
    loading: true,
  };
};

const fetchOrderSuccess = (state, action) => {
  return {
    ...state,
    orders: action.orders,
    loading: false,
  };
};

const fetchOrderFail = (state) => {
  return {
    ...state,
    orders: [],
    loading: false,
  };
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case (actionTypes.PURCHASE_INIT):
      return initPurchase(state);
    case(actionTypes.PURCHASE_BURGER_SUCCESS):
      return purchaseBurgerSuccess(state, action);
    case (actionTypes.PURCHASE_BURGER_FAIL):
     return purchaseBurgerFail(state);
    case (actionTypes.FETCH_ORDERS_START):
      return fetchOrdersStart(state);
    case (actionTypes.FETCH_ORDERS_SUCCESS):
      return fetchOrderSuccess(state, action);
    case (actionTypes.FETCH_ORDERS_FAIL):
      return fetchOrderFail(state);
    default:
      return {
        ...state
      };
  }
};

export default orderReducer;
