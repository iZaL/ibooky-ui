import {createSelector} from 'reselect';
import {denormalize} from 'normalizr';
import {Schema} from 'utils/schema';

const schemas = state => state.entities;
const ordersReducer = state => state.company.orders.ids;
const getItemIdProp = (state, itemID) => itemID;

const getOrderByID = () => {
  return createSelector([schemas, getItemIdProp], (entities, itemID) =>
    denormalize(itemID, Schema.orders, entities),
  );
};

const getOrders = createSelector(
  [schemas, ordersReducer],
  (entities, orders) => {
    return (
      (orders &&
        orders.map(orderId => denormalize(orderId, Schema.orders, entities))) || []
    );
  },
);

export const SELECTORS = {
  getOrders,
  getOrderByID,
};
