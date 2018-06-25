export const ACTION_TYPES = {
  FETCH_ORDERS_REQUEST: '@company/FETCH_ORDERS_REQUEST',
  FETCH_ORDERS_SUCCESS: '@company/FETCH_ORDERS_SUCCESS',
  FETCH_ORDERS_FAILURE: '@company/FETCH_ORDERS_FAILURE',

  FETCH_ORDERS_REFRESH_REQUEST: '@company/FETCH_ORDERS_REFRESH_REQUEST',

  FETCH_ORDER_DETAILS_REQUEST: '@company/FETCH_ORDER_DETAILS_REQUEST',
  FETCH_ORDER_DETAILS_SUCCESS: '@company/FETCH_ORDER_DETAILS_SUCCESS',
  FETCH_ORDER_DETAILS_FAILURE: '@company/FETCH_ORDER_DETAILS_FAILURE',

  SCAN_CODE_REQUEST: '@company/SCAN_CODE_REQUEST',
  SCAN_CODE_SUCCESS: '@company/SCAN_CODE_SUCCESS',
  SCAN_CODE_FAILURE: '@company/SCAN_CODE_FAILURE',

  REDEEM_CODE_REQUEST: '@company/REDEEM_CODE_REQUEST',
  REDEEM_CODE_SUCCESS: '@company/REDEEM_CODE_SUCCESS',
  REDEEM_CODE_FAILURE: '@company/REDEEM_CODE_FAILURE',
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

function scanCode(params) {
  return {
    type: ACTION_TYPES.SCAN_CODE_REQUEST,
    params,
  };
}

function redeemCode(params) {
  return {
    type: ACTION_TYPES.REDEEM_CODE_REQUEST,
    params,
  };
}

export const ACTIONS = {
  fetchOrders,
  fetchOrdersRefresh,
  fetchOrderDetails,
  scanCode,
  redeemCode,
};
