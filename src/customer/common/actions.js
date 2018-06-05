export const ACTION_TYPES = {
  CART_SET_ITEM: '@customer/cart/SET_ITEM',
  CART_SET_TOTAL: '@customer/cart/SET_TOTAL',

  CART_REMOVE_ITEM:'@customer/cart/REMOVE_ITEM',

  CATEGORY_SET_ITEM: '@customer/category/SET_ITEM',

  FETCH_CATEGORIES_REQUEST: '@customer/FETCH_CATEGORIES_REQUEST',
  FETCH_CATEGORIES_SUCCESS: '@customer/FETCH_CATEGORIES_SUCCESS',
  FETCH_CATEGORIES_FAILURE: '@customer/FETCH_CATEGORIES_FAILURE',

  FETCH_CATEGORY_DETAIL_REQUEST: '@customer/FETCH_CATEGORY_DETAIL_REQUEST',
  FETCH_CATEGORY_DETAIL_SUCCESS: '@customer/FETCH_CATEGORY_DETAIL_SUCCESS',
  FETCH_CATEGORY_DETAIL_FAILURE: '@customer/FETCH_CATEGORY_DETAIL_FAILURE',

  FETCH_PRODUCT_DETAIL_REQUEST: '@customer/FETCH_PRODUCT_DETAIL_REQUEST',
  FETCH_PRODUCT_DETAIL_SUCCESS: '@customer/FETCH_PRODUCT_DETAIL_SUCCESS',
  FETCH_PRODUCT_DETAIL_FAILURE: '@customer/FETCH_PRODUCT_DETAIL_FAILURE',

  FETCH_ORDER_DETAIL_REQUEST: '@customer/FETCH_ORDER_DETAIL_REQUEST',
  FETCH_ORDER_DETAIL_SUCCESS: '@customer/FETCH_ORDER_DETAIL_SUCCESS',
  FETCH_ORDER_DETAIL_FAILURE: '@customer/FETCH_ORDER_DETAIL_FAILURE',

  FETCH_CATEGORIES_WITH_PRODUCTS_REQUEST:
    '@customer/FETCH_CATEGORIES_WITH_PRODUCTS_REQUEST',
  FETCH_CATEGORIES_WITH_PRODUCTS_SUCCESS:
    '@customer/FETCH_CATEGORIES_WITH_PRODUCTS_SUCCESS',
  FETCH_CATEGORIES_WITH_PRODUCTS_FAILURE:
    '@customer/FETCH_CATEGORIES_WITH_PRODUCTS_FAILURE',

  FETCH_PRODUCTS_REQUEST: '@customer/FETCH_PRODUCTS_REQUEST',
  FETCH_PRODUCTS_SUCCESS: '@customer/FETCH_PRODUCTS_SUCCESS',
  FETCH_PRODUCTS_FAILURE: '@customer/FETCH_PRODUCTS_FAILURE',

  CREATE_ORDER_REQUEST: '@customer/CREATE_ORDER_REQUEST',
  CREATE_ORDER_SUCCESS: '@customer/CREATE_ORDER_SUCCESS',
  CREATE_ORDER_FAILURE: '@customer/CREATE_ORDER_FAILURE',

  FETCH_PAST_ORDERS_REQUEST: '@customer/FETCH_PAST_ORDERS_REQUEST',
  FETCH_PAST_ORDERS_SUCCESS: '@customer/FETCH_PAST_ORDERS_SUCCESS',
  FETCH_PAST_ORDERS_FAILURE: '@customer/FETCH_PAST_ORDERS_FAILURE',
  FETCH_PAST_ORDERS_REFRESH_REQUEST:
    '@customer/FETCH_PAST_ORDERS_REFRESH_REQUEST',
};

function fetchCategories() {
  return {
    type: ACTION_TYPES.FETCH_CATEGORIES_REQUEST,
  };
}

function fetchCategoriesWithProducts(params = {}) {
  return {
    type: ACTION_TYPES.FETCH_CATEGORIES_WITH_PRODUCTS_REQUEST,
    params,
  };
}

function fetchProductDetails(params) {
  return {
    type: ACTION_TYPES.FETCH_PRODUCT_DETAIL_REQUEST,
    params,
  };
}
function fetchOrderDetails(params) {
  return {
    type: ACTION_TYPES.FETCH_ORDER_DETAIL_REQUEST,
    params,
  };
}

function fetchCategoryDetails(params) {
  return {
    type: ACTION_TYPES.FETCH_CATEGORY_DETAIL_REQUEST,
    params,
  };
}

function setCartItem(params) {
  return {
    type: ACTION_TYPES.CART_SET_ITEM,
    params,
  };
}
function removeCartItem(params) {
  return {
    type: ACTION_TYPES.CART_REMOVE_ITEM,
    params,
  };
}

function setCartTotal(total) {
  return {
    type: ACTION_TYPES.CART_SET_TOTAL,
    total: total,
  };
}

function createOrder(params) {
  return {
    type: ACTION_TYPES.CREATE_ORDER_REQUEST,
    params,
  };
}

function setCategoryItem(key, value) {
  return {
    type: ACTION_TYPES.CATEGORY_SET_ITEM,
    key,
    value,
  };
}

function fetchPastOrders(params) {
  return {
    type: ACTION_TYPES.FETCH_PAST_ORDERS_REQUEST,
    params,
  };
}

function fetchPastOrdersRefresh(params) {
  return {
    type: ACTION_TYPES.FETCH_PAST_ORDERS_REFRESH_REQUEST,
    params,
  };
}
export const ACTIONS = {
  fetchCategories,
  fetchCategoriesWithProducts,
  setCartItem,
  removeCartItem,
  setCartTotal,
  createOrder,
  setCategoryItem,
  fetchProductDetails,
  fetchOrderDetails,
  fetchPastOrders,
  fetchPastOrdersRefresh,
  fetchCategoryDetails,
};
