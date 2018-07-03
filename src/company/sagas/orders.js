import {all, call, fork, put, takeLatest, select} from 'redux-saga/effects';
import {ACTION_TYPES} from 'company/common/actions';
import {API} from 'company/common/api';
import {Schema} from 'utils/schema';
import {normalize} from 'normalizr';
import I18n from 'utils/locale';
import {ACTIONS as APP_ACTIONS} from 'app/common/actions';

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

function* scanCode(action) {
  const {code, resolve, reject} = action.params;
  try {
    const params = {
      body: {
        code: code,
      },
    };
    const response = yield call(API.scanCode, params);
    const normalized = normalize(response.data, Schema.orders);

    yield put({
      type: ACTION_TYPES.SCAN_CODE_SUCCESS,
      entities: normalized.entities,
    });

    yield resolve(response.data);
  } catch (error) {
    yield put({type: ACTION_TYPES.SCAN_CODE_FAILURE, error});

    yield put(
      APP_ACTIONS.setNotification({
        message: error,
        type: 'error',
      }),
    );

    yield reject(error);
  }
}

function* redeemCode(action) {
  const {code, resolve, reject} = action.params;
  try {
    const params = {
      body: {
        code: code,
      },
    };
    const response = yield call(API.redeemCode, params);
    const normalized = normalize(response.data, Schema.orders);

    yield put({
      type: ACTION_TYPES.REDEEM_CODE_SUCCESS,
      entities: normalized.entities,
    });

    yield resolve(response.data);
  } catch (error) {
    yield put({type: ACTION_TYPES.REDEEM_CODE_FAILURE, error});

    yield put(
      APP_ACTIONS.setNotification({
        message: error,
        type: 'error',
      }),
    );

    yield reject(error);
  }
}

function* fetchOrdersMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_ORDERS_REQUEST, fetchOrders);
}

function* fetchOrderDetailsMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_ORDER_DETAILS_REQUEST, fetchOrderDetails);
}

function* scanCodeMonitor() {
  yield takeLatest(ACTION_TYPES.SCAN_CODE_REQUEST, scanCode);
}
function* redeemCodeMonitor() {
  yield takeLatest(ACTION_TYPES.REDEEM_CODE_REQUEST, redeemCode);
}

export const sagas = all([
  fork(fetchOrdersMonitor),
  fork(fetchOrderDetailsMonitor),
  fork(scanCodeMonitor),
  fork(redeemCodeMonitor),
]);
