import {ACTION_TYPES} from 'customer/common/actions';
import union from 'lodash/union';

const initialState = {
  isFetching: false,
  nextPage: undefined,
  error: null,
  collection: [],
  term:null
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.PRODUCT_SEARCH_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null,
        term:action.params.term
      };
    case ACTION_TYPES.PRODUCT_SEARCH_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        collection: action.products.collection,
        nextPage: action.products.nextPage,
      };
    }
    case ACTION_TYPES.PRODUCT_SEARCH_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
}
