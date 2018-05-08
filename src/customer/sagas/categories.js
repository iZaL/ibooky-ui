import {all, call, fork, put, takeLatest, select} from 'redux-saga/effects';
import {ACTION_TYPES} from 'customer/common/actions';
import {API} from 'customer/common/api';
import {Schema} from 'utils/schema';
import {normalize} from 'normalizr';
import I18n from 'utils/locale';

function* fetchCategories() {
  try {
    const response = yield call(API.fetchCategories);
    const normalized = normalize(response.data, [Schema.categories]);
    yield put({
      type: ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
      entities: normalized.entities,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_CATEGORIES_FAILURE, error});
  }
}

function* fetchCategoriesWithProducts() {
  try {
    const response = yield call(API.fetchCategoriesWithProducts);
    const normalized = normalize(response.data, [Schema.categories]);
    yield put({
      type: ACTION_TYPES.FETCH_CATEGORIES_WITH_PRODUCTS_SUCCESS,
      entities: normalized.entities,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_CATEGORIES_WITH_PRODUCTS_FAILURE, error});
  }
}

// Monitoring Sagas
function* fetchCategoriesMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_CATEGORIES_REQUEST, fetchCategories);
}

function* fetchCategoriesWithProductsMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_CATEGORIES_WITH_PRODUCTS_REQUEST, fetchCategoriesWithProducts);
}

export const sagas = all([fork(fetchCategoriesMonitor),fork(fetchCategoriesWithProductsMonitor)]);
