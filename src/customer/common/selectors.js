import {createSelector} from 'reselect';
import {denormalize} from 'normalizr';
import {Schema} from 'utils/schema';

const cartReducer = state => state.customer.cart;
const cartProducts = state => state.customer.cart.products;
const schemas = state => state.entities;
const productsSchema = state => state.entities.products;
const categoriesSchema = state => state.entities.categories;
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

const getProducts = createSelector(
  [schemas, productsSchema],
  (entities, products) => {
    return products && Object.keys(products).map(productID => {
          let cartProduct = products[productID];
          return {
            ...denormalize(productID, Schema.products, entities),
            cart: {
              ...cartProduct
            },
          };
        })
      || []
      ;
  },
);

const getCategories = createSelector(
  [schemas, categoriesSchema],
  (entities, categories) => {
    return categories && Object.keys(categories).map(id => {
        return {
          ...denormalize(id, Schema.categories, entities),
        };
      })
      || []
      ;
  },
);


export const SELECTORS = {
  getCartProducts,
  getCartProduct,
  getProducts,
  getCategories
};
