export const ACTION_TYPES = {

  CART_SET_ITEM: '@customer/cart/SET_ITEM',
  CART_SET_TOTAL: '@customer/cart/SET_TOTAL',

  FETCH_CATEGORIES_REQUEST: '@customer/FETCH_CATEGORIES_REQUEST',
  FETCH_CATEGORIES_SUCCESS: '@customer/FETCH_CATEGORIES_SUCCESS',
  FETCH_CATEGORIES_FAILURE: '@customer/FETCH_CATEGORIES_FAILURE',
};

function fetchCategories() {
  return {
    type: ACTION_TYPES.FETCH_CATEGORIES_REQUEST,
  };
}

function setCartItem(params) {
  return {
    type: ACTION_TYPES.CART_SET_ITEM,
    params
  };
}

export const ACTIONS = {
  fetchCategories,
  setCartItem
};
