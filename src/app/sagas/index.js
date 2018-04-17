import {all} from 'redux-saga/effects';
import {sagas as app} from 'app/sagas/app';

export const sagas = all([app]);
