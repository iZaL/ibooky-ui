import {ACTION_TYPES} from 'customer/common/actions';

const initialState = {
  isFetching: false,
  nextPage: undefined,
  error: null,
  activeCategoryID: null,
  products: {},
  // products: {
  //   [1] : {
  //     collection:[],
  //     nextPage:null
  //   }
  // }
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.FETCH_CATEGORIES_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null,
        // products:
      };


    case ACTION_TYPES.FETCH_CATEGORIES_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
      };
    }
    case ACTION_TYPES.FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };

    case ACTION_TYPES.CATEGORY_SET_ITEM:
      return {
        ...state,
        [action.key]: action.value,
      };
    case ACTION_TYPES.FETCH_CATEGORY_DETAIL_SUCCESS:
      return {
        ...state,
        isFetching: true,
        error: null,
        products:{
          ...state.products,
          ...action.products
        }
      };
    default:
      return state;
  }
}
