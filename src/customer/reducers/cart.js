import {ACTION_TYPES} from 'customer/common/actions';

const initialState = {
  products: {
    1: {
      id: 1,
      quantity: 2,
      total: 100,
      attributes: {
        2:{
          parent_id:2,
          child_id:3
        }
      }
    }
  },
  total: 100
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
      return {
        ...state,
        products: {
          ...state.products,
          [productID]: {
            ...state.products[productID],
            attributes:{
              ...state.products[productID].attributes,
              ...action.params.attributes
            }
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
