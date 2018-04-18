import {combineReducers} from 'redux';
import {reducer as cart} from 'customer/reducers/cart';
import {reducer as categories} from 'customer/reducers/categories';

export const reducer = combineReducers({cart, categories});
