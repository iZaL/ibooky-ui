import {ACTION_TYPES} from 'customer/common/actions';
import union from 'lodash/union';

const initialState = {
  isFetching: false,
  nextPage: undefined,
  error: null,
  collection: [],
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.FETCH_FAVORITE_PRODUCTS_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case ACTION_TYPES.FETCH_FAVORITE_PRODUCTS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        collection: union(state.collection, action.products.collection),
        nextPage: action.products.nextPage,
      };
    }
    case ACTION_TYPES.FETCH_FAVORITE_PRODUCTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case ACTION_TYPES.PRODUCT_FAVORITE_REQUEST: {
      return {
        ...state,
        isFetching: false,
        error: null,
        collection: union(state.collection, [action.params.product_id]),
      };
    }

    default:
      return state;
  }
}
