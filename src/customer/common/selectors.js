import {createSelector} from 'reselect';
import {denormalize} from 'normalizr';
import {Schema} from 'utils/schema';

const cartProducts = state => state.customer.cart.products;
const schemas = state => state.entities;
const productsSchema = state => state.entities.products;
const categoriesSchema = state => state.entities.categories;
const ordersSchema = state => state.entities.orders;
const categoryReducer = state => state.customer.categories;
const orders = state => state.customer.orders.ids;
const favoritesReducer = state => state.customer.favorites;
const getIdProp = (state, id) => id;

const getProducts = createSelector(
  [schemas, productsSchema],
  (entities, products) => {
    return (
      (products &&
        Object.keys(products).map(productID => {
          let cartProduct = products[productID];
          return {
            ...denormalize(productID, Schema.products, entities),
            cart: {
              ...cartProduct,
            },
          };
        })) ||
      []
    );
  },
);

const getFavoriteProducts = createSelector(
  [schemas, favoritesReducer,productsSchema],
  (entities, favorites, products) => {
    return favorites.collection.map(productID => {
      let cartProduct = products[productID];
      return {
        ...denormalize(productID, Schema.products, entities),
        cart: {
          ...cartProduct,
        },
      };
    }).filter(product => product.favorited === true) || [];
  },
);

const getCartProducts = createSelector(
  [schemas, cartProducts],
  (entities, products) => {
    return Object.keys(products).map(productID => {
      let cartProduct = products[productID];
      return {
        ...denormalize(productID, Schema.products, entities),
        cart: {
          ...cartProduct,
        },
      };
    });
  },
);

const getProduct = () => {
  return createSelector(
    [schemas, productsSchema, cartProducts, getIdProp],
    (entities, products, cart, id) => {
      let product = products[id];
      let cartProduct = cart[id];

      if (product) {
        return {
          ...denormalize(product.id, Schema.products, entities),
          cart: {
            ...cartProduct,
          },
        };
      }

      return {
        images: [],
      };
    },
  );
};

const getOrderByID = () => {
  return createSelector(
    [schemas, ordersSchema, getIdProp],
    (entities, orders, id) => {
      let order = orders[id];
      if (order) {
        return denormalize(order.id, Schema.orders, entities);
      }
      return {};
    },
  );
};

const getCategories = createSelector(
  [schemas, categoriesSchema],
  (entities, categories) => {
    return (
      (categories &&
        Object.keys(categories).map(id => {
          return {
            ...denormalize(id, Schema.categories, entities),
          };
        })) ||
      []
    );
  },
);

const getCategoriesWithProducts = createSelector(
  [schemas, categoriesSchema, categoryReducer],
  (entities, categories, reducer) => {
    return (
      (categories &&
        Object.keys(categories).map(id => {
          return {
            ...denormalize(id, Schema.categories, entities),
            products:
            (reducer.activeCategoryID &&
              reducer.products[reducer.activeCategoryID] &&
              reducer.products[reducer.activeCategoryID].collection.map(
                id => {
                  return {
                    ...denormalize(id, Schema.products, entities),
                  };
                },
              )) ||
            [],
          };
        })) ||
      []
    );
  },
);

const getCategoryProducts = createSelector(
  [schemas, categoryReducer],
  (entities, reducer) => {
    return (
      (reducer.activeCategoryID &&
        reducer.products[reducer.activeCategoryID] &&
        reducer.products[reducer.activeCategoryID].collection.map(id => {
          return {
            ...denormalize(id, Schema.products, entities),
          };
        })) ||
      []
    );
  },
);

const getOrders = createSelector(
  [schemas, orders],
  (entities, orderIDs) => {
    return (
      (orderIDs &&
        orderIDs.map(orderId => denormalize(orderId, Schema.orders, entities))) ||
      []
    );
  },
);

export const SELECTORS = {
  getCartProducts,
  getProduct,
  getProducts,
  getFavoriteProducts,
  getCategories,
  getCategoryProducts,
  getCategoriesWithProducts,
  getOrderByID,
  getOrders,
};
