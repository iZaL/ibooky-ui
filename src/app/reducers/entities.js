import merge from 'lodash/merge';

export function reducer(
  state = {
    users: {},
    categories: {},
    products: {},
    attributes: {},
    orders: {},
    pages:{}
  },
  action = {},
) {
  if (action.entities) {
    return merge({}, state, action.entities);
  }

  return state;
}
