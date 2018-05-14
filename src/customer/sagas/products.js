import {all, call, fork, put, takeLatest, select} from 'redux-saga/effects';
import {ACTION_TYPES} from 'customer/common/actions';
import {API} from 'customer/common/api';
import {Schema} from 'utils/schema';
import {normalize} from 'normalizr';
import I18n from 'utils/locale';

function* fetchProductDetails(action) {
  try {
    const response = yield call(API.fetchProductDetails, action.params);
    const normalized = normalize(response.data, Schema.products);
    yield put({
      type: ACTION_TYPES.FETCH_PRODUCT_DETAIL_SUCCESS,
      entities: normalized.entities,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_PRODUCT_DETAIL_FAILURE, error});
  }
}

function* fetchProductDetailsMonitor() {
  yield takeLatest(
    ACTION_TYPES.FETCH_PRODUCT_DETAIL_REQUEST,
    fetchProductDetails,
  );
}

export const sagas = all([fork(fetchProductDetailsMonitor)]);
