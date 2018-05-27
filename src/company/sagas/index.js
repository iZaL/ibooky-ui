import {sagas as orders} from 'company/sagas/orders';
import {all} from 'redux-saga/effects';

export const sagas = all([orders]);
