export const ACTION_TYPES = {
  CART_SET_ITEM: '@customer/cart/SET_ITEM',
  CART_REMOVE_ITEM: '@customer/cart/REMOVE_ITEM',

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

  FETCH_FAVORITE_PRODUCTS_REQUEST: '@customer/FETCH_FAVORITE_PRODUCTS_REQUEST',
  FETCH_FAVORITE_PRODUCTS_SUCCESS: '@customer/FETCH_FAVORITE_PRODUCTS_SUCCESS',
  FETCH_FAVORITE_PRODUCTS_FAILURE: '@customer/FETCH_FAVORITE_PRODUCTS_FAILURE',

  FETCH_CATEGORIES_WITH_PRODUCTS_REQUEST:
    '@customer/FETCH_CATEGORIES_WITH_PRODUCTS_REQUEST',
  FETCH_CATEGORIES_WITH_PRODUCTS_SUCCESS:
    '@customer/FETCH_CATEGORIES_WITH_PRODUCTS_SUCCESS',
  FETCH_CATEGORIES_WITH_PRODUCTS_FAILURE:
    '@customer/FETCH_CATEGORIES_WITH_PRODUCTS_FAILURE',

  FETCH_PRODUCTS_REQUEST: '@customer/FETCH_PRODUCTS_REQUEST',
  FETCH_PRODUCTS_SUCCESS: '@customer/FETCH_PRODUCTS_SUCCESS',
  FETCH_PRODUCTS_FAILURE: '@customer/FETCH_PRODUCTS_FAILURE',

  PRODUCT_FAVORITE_REQUEST: '@customer/PRODUCT_FAVORITE_REQUEST',
  PRODUCT_FAVORITE_SUCCESS: '@customer/PRODUCT_FAVORITE_SUCCESS',
  PRODUCT_FAVORITE_FAILURE: '@customer/PRODUCT_FAVORITE_FAILURE',

  PRODUCT_SEARCH_REQUEST: '@customer/PRODUCT_SEARCH_REQUEST',
  PRODUCT_SEARCH_SUCCESS: '@customer/PRODUCT_SEARCH_SUCCESS',
  PRODUCT_SEARCH_FAILURE: '@customer/PRODUCT_SEARCH_FAILURE',

  CREATE_ORDER_REQUEST: '@customer/CREATE_ORDER_REQUEST',
  CREATE_ORDER_SUCCESS: '@customer/CREATE_ORDER_SUCCESS',
  CREATE_ORDER_FAILURE: '@customer/CREATE_ORDER_FAILURE',

  CHECKOUT_REQUEST: '@customer/CHECKOUT_REQUEST',
  CHECKOUT_SUCCESS: '@customer/CHECKOUT_SUCCESS',
  CHECKOUT_FAILURE: '@customer/CHECKOUT_FAILURE',

  FETCH_PAGE_REQUEST: '@customer/FETCH_PAGE_REQUEST',
  FETCH_PAGE_SUCCESS: '@customer/FETCH_PAGE_SUCCESS',
  FETCH_PAGE_FAILURE: '@customer/FETCH_PAGE_FAILURE',

  FETCH_ORDERS_REQUEST: '@customer/FETCH_ORDERS_REQUEST',
  FETCH_ORDERS_SUCCESS: '@customer/FETCH_ORDERS_SUCCESS',
  FETCH_ORDERS_FAILURE: '@customer/FETCH_ORDERS_FAILURE',
  FETCH_ORDERS_REFRESH_REQUEST: '@customer/FETCH_ORDERS_REFRESH_REQUEST',

  SET_PAYMENT_SUCCESS_REQUEST: '@customer/SET_PAYMENT_SUCCESS_REQUEST',
  SET_PAYMENT_SUCCESS_FAILURE: '@customer/SET_PAYMENT_SUCCESS_FAILURE',
  SET_PAYMENT_SUCCESS_SUCCESS: '@customer/SET_PAYMENT_SUCCESS_SUCCESS',
};

function fetchCategories() {
  return {
    type: ACTION_TYPES.FETCH_CATEGORIES_REQUEST,
  };
}
function fetchProducts() {
  return {
    type: ACTION_TYPES.FETCH_PRODUCTS_REQUEST,
  };
}

function fetchCategoriesWithProducts(params = {}) {
  return {
    type: ACTION_TYPES.FETCH_CATEGORIES_WITH_PRODUCTS_REQUEST,
    params,
  };
}

function fetchFavoriteProducts(params = {}) {
  return {
    type: ACTION_TYPES.FETCH_FAVORITE_PRODUCTS_REQUEST,
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

function fetchPage(params) {
  return {
    type: ACTION_TYPES.FETCH_PAGE_REQUEST,
    params,
  };
}

function favoriteProduct(params) {
  return {
    type: ACTION_TYPES.PRODUCT_FAVORITE_REQUEST,
    params,
  };
}

function searchProducts(params) {
  return {
    type: ACTION_TYPES.PRODUCT_SEARCH_REQUEST,
    params,
  };
}

function checkout(params) {
  return {
    type: ACTION_TYPES.CHECKOUT_REQUEST,
    params,
  };
}

function paymentSuccess(params) {
  return {
    type: ACTION_TYPES.SET_PAYMENT_SUCCESS_REQUEST,
    params,
  };
}

export const ACTIONS = {
  fetchCategories,
  fetchProducts,
  fetchCategoriesWithProducts,
  fetchFavoriteProducts,
  setCartItem,
  removeCartItem,
  createOrder,
  setCategoryItem,
  fetchProductDetails,
  fetchOrderDetails,
  fetchOrders,
  fetchOrdersRefresh,
  fetchCategoryDetails,
  favoriteProduct,
  searchProducts,
  checkout,
  paymentSuccess,
  fetchPage
};
