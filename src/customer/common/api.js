import {request} from 'utils/network';

function fetchCategories() {
  const path = `customer/categories`;
  return request({path});
}

function fetchCategoryDetails(params) {
  const path = `customer/categories/${params.category_id}/details`;
  return request({path, params: params});
}

function fetchCategoriesWithProducts() {
  const path = `customer/categories`;
  return request({path});
}

function fetchProductDetails(params) {
  const path = `customer/products/${params.product_id}/details`;
  return request({path});
}

function fetchOrderDetails(params) {
  const path = `customer/orders/${params.order_id}/details`;
  return request({path});
}

function favoriteProduct(params) {
  console.log('params',params);
  const path = `customer/products/favorite`;
  let requestParams = {
    path,
    params,
    method: 'POST',
  };
  return request(requestParams);
}

function checkout(params) {
  console.log('params',params);
  const path = `customer/orders/checkout`;
  let requestParams = {
    path,
    params,
    method: 'POST',
  };
  return request(requestParams);
}

function createOrder(params) {
  const path = `customer/orders`;
  let requestParams = {
    path,
    params,
    method: 'POST',
  };
  return request(requestParams);
}

function fetchPastOrders(params = {}) {
  const path = `customer/orders`;
  return request({path, params});
}

export const API = {
  fetchCategories,
  fetchCategoriesWithProducts,
  fetchProductDetails,
  fetchOrderDetails,
  fetchCategoryDetails,
  fetchPastOrders,
  createOrder,
  favoriteProduct,
  checkout,
};
