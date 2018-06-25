import {combineReducers} from 'redux';
import {reducer as cart} from 'customer/reducers/cart';
import {reducer as orders} from 'customer/reducers/orders';
import {reducer as categories} from 'customer/reducers/categories';
import {reducer as favorites} from 'customer/reducers/favorites';
import {reducer as products} from 'customer/reducers/products';

export const reducer = combineReducers({
  cart,
  categories,
  orders,
  favorites,
  products,
});
