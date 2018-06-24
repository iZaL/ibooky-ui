import {all, call, fork, put, takeLatest, select} from 'redux-saga/effects';
import {ACTION_TYPES} from 'company/common/actions';
import {API} from 'company/common/api';
import {Schema} from 'utils/schema';
import {normalize} from 'normalizr';
import I18n from 'utils/locale';

function* fetchOrders(action) {
  try {
    const state = yield select();

    const {nextPage} = state.company.orders;

    if (nextPage === null && !action.params.force) {
      yield put({
        type: ACTION_TYPES.FETCH_ORDERS_FAILURE,
        error: I18n.t('no_more_records'),
      });
    } else {
      const params = {
        paginated: !!nextPage,
        paginatedUrl: nextPage,
      };

      const response = yield call(API.fetchOrders, params);

      const normalized = normalize(response.data, [Schema.orders]);
      const {entities, result} = normalized;

      yield put({
        type: ACTION_TYPES.FETCH_ORDERS_SUCCESS,
        entities: entities,
        result: result,
        nextPage: (response.links && response.links.next) || null,
      });
    }
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_ORDERS_FAILURE, error});
  }
}

function* fetchOrderDetails(action) {
  try {
    const response = yield call(API.fetchOrderDetails, action.order_id);
    const normalizedOrders = normalize(response.data, Schema.orders);
    yield put({
      type: ACTION_TYPES.FETCH_ORDER_DETAILS_SUCCESS,
      entities: normalizedOrders.entities,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_ORDER_DETAILS_FAILURE, error});
  }
}

function* fetchOrdersMonitor() {
  yield takeLatest(
    ACTION_TYPES.FETCH_ORDERS_REQUEST,
    fetchOrders,
  );
}

function* fetchOrderDetailsMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_ORDER_DETAILS_REQUEST, fetchOrderDetails);
}

export const sagas = all([
  fork(fetchOrdersMonitor),
  fork(fetchOrderDetailsMonitor),
]);
