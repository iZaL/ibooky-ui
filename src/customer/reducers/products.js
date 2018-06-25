import {ACTION_TYPES} from 'customer/common/actions';

const initialState = {
  isFetching: false,
  nextPage: undefined,
  error: null,
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.FETCH_PRODUCT_DETAIL_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null,
        // products:
      };

    case ACTION_TYPES.FETCH_PRODUCT_DETAIL_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
      };
    }
    case ACTION_TYPES.FETCH_PRODUCT_DETAIL_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
}
