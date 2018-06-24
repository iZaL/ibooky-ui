import Qs from 'qs';
import {all, call, fork, put, select, takeLatest} from 'redux-saga/effects';
import {ACTION_TYPES} from 'customer/common/actions';
import {API} from 'customer/common/api';
import {Schema} from 'utils/schema';
import {normalize} from 'normalizr';
import flatten from 'lodash/flatten';
import {ACTIONS as APP_ACTIONS} from 'app/common/actions';

function* checkout(action) {
  const {order_id, attributes, resolve, reject} = action.params;
  // try {
  //   const params = {
  //     body: {
  //       ...item,
  //     },
  //   };
  //   const response = yield call(API.createOrder, params);
  //   const normalized = normalize(response.data, Schema.orders);
  //   yield put({
  //     type: ACTION_TYPES.CREATE_ORDER_SUCCESS,
  //     entities: normalized.entities,
  //     payload: response.data,
  //   });
  //   yield resolve(response.data);
  // } catch (error) {
  //   yield put({type: ACTION_TYPES.CREATE_ORDER_FAILURE, error});
  //
  //   yield put(
  //     APP_ACTIONS.setNotification({
  //       message: error,
  //       type: 'error',
  //     }),
  //   );
  //
  //   yield reject(error);
  // }

  try {
    const params = {
      body: {
        ...attributes,
        order_id: order_id,
      },
    };
    const response = yield call(API.checkout, params);
    const normalized = normalize(response.data, Schema.orders);

    yield put({
      type: ACTION_TYPES.CHECKOUT_SUCCESS,
      entities: normalized.entities,
    });

    yield resolve(response.data);
  } catch (error) {
    yield put({type: ACTION_TYPES.CHECKOUT_FAILURE, error});

    yield put(
      APP_ACTIONS.setNotification({
        message: error,
        type: 'error',
      }),
    );

    yield reject(error);
  }
}

function* checkoutMonitor() {
  yield takeLatest(ACTION_TYPES.CHECKOUT_REQUEST, checkout);
}

export const sagas = all([fork(checkoutMonitor)]);
