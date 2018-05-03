import {createSelector} from 'reselect';
import {denormalize} from 'normalizr';
import {Schema} from 'utils/schema';

const cartReducer = state => state.customer.cart;
const cartProducts = state => state.customer.cart.products;
const schemas = state => state.entities;
const getIdProp = (state, id) => id;

const getCartProducts = createSelector(
  [schemas, cartProducts],
  (entities, products) => {
    return Object.keys(products)
      .map(productID => {
        let cartProduct = products[productID];
        return {
          ...denormalize(productID, Schema.products, entities),
          cart: {
            ...cartProduct
          },
        };
      });
  },
);

const getCartProduct = () => {
  return createSelector([schemas, cartProducts, getIdProp], (entities, products, id) => {
    let cartProduct = products[id];
      return {
        ...denormalize(id, Schema.products, entities),
        cart: {
          ...cartProduct
        },
      }
    }
  );
};

export const SELECTORS = {
  getCartProducts,
  getCartProduct
};
