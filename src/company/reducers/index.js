import {combineReducers} from 'redux';
import {reducer as upcoming_orders} from 'company/reducers/upcoming_orders';
import {reducer as past_orders} from 'company/reducers/past_orders';

export const reducer = combineReducers({
  upcoming_orders,
  past_orders,
});
