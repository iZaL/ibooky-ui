import isNull from 'lodash/isNull';
import {request} from 'utils/network';

function fetchCategories() {
  const path = `customer/categories`;
  return request({path});
}

function fetchCategoriesWithProducts() {
  const path = `customer/categories`;
  return request({path});
}

export const API = {
  fetchCategories,
  fetchCategoriesWithProducts
};
