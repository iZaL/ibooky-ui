import isNull from 'lodash/isNull';
import {request} from 'utils/network';

function fetchCategories() {
  const path = `customer/categories`;
  return request({path});
}

function fetchCategoryDetails(params) {
  const path = `customer/categories/${params.category_id}/details`;
  return request({path,params:params});
}

function fetchCategoriesWithProducts() {
  const path = `customer/categories`;
  return request({path});
}

function fetchProductDetails(params) {
  const path = `customer/products/${params.product_id}/details`;
  return request({path});
}

export const API = {
  fetchCategories,
  fetchCategoriesWithProducts,
  fetchProductDetails,
  fetchCategoryDetails
};
