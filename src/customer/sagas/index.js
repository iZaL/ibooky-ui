import {sagas as categories} from 'customer/sagas/categories';
import {sagas as products} from 'customer/sagas/products';
import {sagas as orders} from 'customer/sagas/orders';
import {all} from 'redux-saga/effects';

export const sagas = all([categories, products, orders]);
