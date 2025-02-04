import Qs from 'qs';
import {all, call, fork, put, select, takeLatest} from 'redux-saga/effects';
import {ACTION_TYPES} from 'customer/common/actions';
import {API} from 'customer/common/api';
import {Schema} from 'utils/schema';
import {normalize} from 'normalizr';
import {ACTIONS as APP_ACTIONS} from 'app/common/actions';
import I18n from 'utils/locale';

function* createOrder(action) {
  const {item, resolve, reject} = action.params;
  try {
    const params = {
      body: {
        ...item,
      },
    };
    const response = yield call(API.createOrder, params);
    const normalized = normalize(response.data, Schema.orders);
    yield put({
      type: ACTION_TYPES.CREATE_ORDER_SUCCESS,
      entities: normalized.entities,
      payload: response.data,
    });
    yield resolve(response.data);
  } catch (error) {
    yield put({type: ACTION_TYPES.CREATE_ORDER_FAILURE, error});

    yield put(
      APP_ACTIONS.setNotification({
        message: error,
        type: 'error',
      }),
    );

    yield reject(error);
  }
}

function* setPaymentSuccess(action) {
  // const {item} = action.params;
  try {
    const params = {
      body: {
        ...action.params,
      },
    };
    const response = yield call(API.setPaymentSuccess, params);
    const normalized = normalize(response.data, Schema.orders);
    yield put({
      type: ACTION_TYPES.SET_PAYMENT_SUCCESS_SUCCESS,
      entities: normalized.entities,
      payload: response.data,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.SET_PAYMENT_SUCCESS_FAILURE, error});

    // yield put(
    //   APP_ACTIONS.setNotification({
    //     message: error,
    //     type: 'error',
    //   }),
    // );
  }
}

function* fetchOrderDetails(action) {
  try {
    const response = yield call(API.fetchOrderDetails, action.params);
    const normalized = normalize(response.data, Schema.orders);
    yield put({
      type: ACTION_TYPES.FETCH_ORDER_DETAIL_SUCCESS,
      entities: normalized.entities,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_ORDER_DETAIL_FAILURE, error});
  }
}

function* fetchOrders() {
  try {
    const state = yield select();

    const {nextPage} = state.customer.orders;

    if (nextPage === null) {
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
// Monitoring Sagas
function* createOrderMonitor() {
  yield takeLatest(ACTION_TYPES.CREATE_ORDER_REQUEST, createOrder);
}

function* fetchOrderDetailsMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_ORDER_DETAIL_REQUEST, fetchOrderDetails);
}

function* fetchOrdersMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_ORDERS_REQUEST, fetchOrders);
}

function* setPaymentSuccessMonitor() {
  yield takeLatest(ACTION_TYPES.SET_PAYMENT_SUCCESS_REQUEST, setPaymentSuccess);
}

export const sagas = all([
  fork(createOrderMonitor),
  fork(fetchOrderDetailsMonitor),
  fork(fetchOrdersMonitor),
  fork(setPaymentSuccessMonitor),
]);
