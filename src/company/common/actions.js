export const ACTION_TYPES = {
  FETCH_ORDERS_REQUEST: '@company/FETCH_ORDERS_REQUEST',
  FETCH_ORDERS_SUCCESS: '@company/FETCH_ORDERS_SUCCESS',
  FETCH_ORDERS_FAILURE: '@company/FETCH_ORDERS_FAILURE',

  FETCH_ORDERS_REFRESH_REQUEST:
    '@company/FETCH_ORDERS_REFRESH_REQUEST',

  FETCH_ORDER_DETAILS_REQUEST: '@company/FETCH_ORDER_DETAILS_REQUEST',
  FETCH_ORDER_DETAILS_SUCCESS: '@company/FETCH_ORDER_DETAILS_SUCCESS',
  FETCH_ORDER_DETAILS_FAILURE: '@company/FETCH_ORDER_DETAILS_FAILURE',
};

function fetchOrders(params) {
  return {
    type: ACTION_TYPES.FETCH_ORDERS_REQUEST,
    params,
  };
}

function fetchOrdersRefresh(params) {
  return {
    type: ACTION_TYPES.FETCH_ORDERS_REFRESH_REQUEST,
    params,
  };
}

function fetchOrderDetails(id) {
  return {
    type: ACTION_TYPES.FETCH_ORDER_DETAILS_REQUEST,
    order_id: id,
  };
}

export const ACTIONS = {
  fetchOrders,
  fetchOrdersRefresh,
  fetchOrderDetails,
};
