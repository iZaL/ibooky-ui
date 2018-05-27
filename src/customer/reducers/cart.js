import {ACTION_TYPES} from 'customer/common/actions';

const initialState = {
  products: {},
  total: 0,
  // products: {
  //   1: {
  //     id: 1,
  //     total: 100,
  //     attributes: [3,7]
  //   },
  //   2: {
  //     id: 1,
  //     quantity: 2,
  //     total: 100,
  //     attributes:[2,8]
  //   }
  // },
  // total: 100
};

//CART_SET_ITEM
/**
 * payload
 * {
 *  product_id:1,
 *  attributes:[2,8]
 * }
 *
 */

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.CART_SET_ITEM:

      let {product_id,quantity,total} = action.params;

      let product = state.products[product_id];
      let attributes = product ? product.attributes : [];

      if (action.params.hasOwnProperty('attributes')) {
        attributes = attributes.concat(action.params.attributes);
      }

      let cartTotal = Object.keys(state.products)
        .filter(id => id != product_id)
        .map(prodID => state.products[prodID].total * state.products[prodID].quantity)
        .reduce((acc, val) => acc + val, 0);

      return {
        ...state,
        products: {
          ...state.products,
          [product_id]: {
            ...product,
            ...action.params,
            attributes: attributes,
          },
        },
        total: cartTotal + (total * quantity)
      };
    case ACTION_TYPES.CART_SET_TOTAL:
      return {
        ...state,
        total: action.total,
      };

    default:
      return state;
  }
}
