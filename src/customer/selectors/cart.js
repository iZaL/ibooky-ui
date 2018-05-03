import map from 'lodash/map';
import {createSelector} from 'reselect';
import {denormalize} from 'normalizr';
import {Schema} from 'utils/schema';
const getCart = state => state.customer.cart;
const cartItems = state => state.customer.cart.items;
const schemas = state => state.entities;

const getCartItems = createSelector(
  [schemas,cartProducts],
  (entities,products) => {
    return Object.keys(products)
      .map(productID => {
        return {
          ...denormalize(productID, Schema.products, entities)
        };
      });
  },
);

// const getPastOrders = createSelector(
//   [schemas, pastOrders],
//   (entities, orders) => {
//     return (
//       (orders &&
//         orders.map(orderId => denormalize(orderId, Schema.orders, entities))) ||
//       []
//     );
//   },
// );

export const SELECTORS = {
  getCartItems,
  // getCartTotal,
};
