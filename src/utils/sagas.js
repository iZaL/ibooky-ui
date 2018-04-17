import {sagas as APP_SAGA} from 'app/sagas';
import {sagas as AUTH_SAGA} from 'guest/common/sagas';
import {all} from 'redux-saga/effects';

const rootSaga = function* rootSaga() {
  yield all([APP_SAGA, AUTH_SAGA]);
};

export default rootSaga;
