import {sagas as categories} from 'customer/sagas/categories';
// import {sagas as cart} from 'customer/sagas/cart';
import {all} from 'redux-saga/effects';

export const sagas = all([categories]);
