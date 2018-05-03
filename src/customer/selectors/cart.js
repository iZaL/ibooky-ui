import {createSelector} from 'reselect';
import {denormalize} from 'normalizr';
import {Schema} from 'utils/schema';

const cartProducts = state => state.customer.cart.products;
const schemas = state => state.entities;

const getCartProducts = createSelector(
  [schemas, cartProducts],
  (entities, products) => {

    return Object.keys(products)
      .map(productID => {
        let cartProduct = products[productID];
        return {
          ...denormalize(productID, Schema.products, entities),
          cart:{
            ...cartProduct
          },
        };
      });
  },
);

export const SELECTORS = {
  getCartProducts,
};
