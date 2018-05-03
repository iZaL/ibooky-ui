import {createSelector} from 'reselect';
import {denormalize} from 'normalizr';
import {Schema} from 'utils/schema';

const cartProducts = state => state.customer.cart.products;
const schemas = state => state.entities;

const getCartItems = createSelector(
  [schemas, cartProducts],
  (entities, products) => {
    return Object.keys(products)
      .map(productID => {
        let cartProduct = products[productID];
        return {
          ...cartProduct,
          ...denormalize(productID, Schema.products, entities),
        };
      });
  },
);

export const SELECTORS = {
  getCartProducts,
};
