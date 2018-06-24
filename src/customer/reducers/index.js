import {combineReducers} from 'redux';
import {reducer as cart} from 'customer/reducers/cart';
import {reducer as past_orders} from 'customer/reducers/past_orders';
import {reducer as categories} from 'customer/reducers/categories';
import {reducer as favorites} from 'customer/reducers/favorites';

export const reducer = combineReducers({cart, categories, past_orders,favorites});
