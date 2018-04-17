import {reducer as app} from 'app/reducers/app';
import {reducer as user} from 'guest/common/reducer';
import {combineReducers} from 'redux';
import {reducer as entities} from 'app/reducers/entities';
import {reducer as notifications} from 'app/reducers/notifications';

const rootReducer = combineReducers({
  app,
  entities,
  notifications,
  user,
});

export default rootReducer;
