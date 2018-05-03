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

      let productID = action.params.product_id;
      let product = state.products[productID];
      let attributes = product ? product.attributes : [];

      if(action.params.hasOwnProperty('attributes')) {
        attributes = attributes.concat(action.params.attributes)
      }

      return {
        ...state,
        products: {
          ...state.products,
          [productID]: {
            ...product,
            ...action.params,
            attributes:attributes
          }
        }
      };
    case ACTION_TYPES.CART_SET_TOTAL:
      return {
        ...state,
        total: action.params.total
      };

    default:
      return state;
  }
}
