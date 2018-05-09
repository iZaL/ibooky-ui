import {createSelector} from 'reselect';
import {denormalize} from 'normalizr';
import {Schema} from 'utils/schema';

const cartProducts = state => state.customer.cart.products;
const schemas = state => state.entities;
const productsSchema = state => state.entities.products;
const categoriesSchema = state => state.entities.categories;
const getIdProp = (state, id) => id;

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

const getProduct = () => {
  return createSelector([schemas, productsSchema, cartProducts, getIdProp], (entities, products, cart, id) => {
      let product = products[id];
      let cartProduct = cart[id];

      if (product) {
        return {
          ...denormalize(product.id, Schema.products, entities),
          cart: {
            ...cartProduct
          },
        }
      }

      return {
        images:[]
      }

    }
  );
};


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
  getProduct,
  getProducts,
  getCategories
};
