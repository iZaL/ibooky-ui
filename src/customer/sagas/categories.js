import {all, call, fork, put, takeLatest, select} from 'redux-saga/effects';
import {ACTION_TYPES} from 'customer/common/actions';
import {API} from 'customer/common/api';
import {Schema} from 'utils/schema';
import {normalize} from 'normalizr';
import I18n from 'utils/locale';

function* fetchCategories() {
  try {
    const response = yield call(API.fetchCategories);
    const normalized = normalize(response.data, [Schema.categories]);
    yield put({
      type: ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
      entities: normalized.entities,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_CATEGORIES_FAILURE, error});
  }
}


// function* fetchUpcomingOrders(action) {
//   try {
//     const state = yield select();
//
//     const {nextPage} = state.company.upcoming_orders;
//
//     if (nextPage === null && !action.params.force) {
//       yield put({
//         type: ACTION_TYPES.FETCH_UPCOMING_ORDERS_FAILURE,
//         error: I18n.t('no_more_records'),
//       });
//     } else {
//       const params = {
//         paginated: !!nextPage,
//         paginatedUrl: nextPage,
//       };
//
//       const response = yield call(API.fetchUpcomingOrders, params);
//
//       const normalized = normalize(response.data, [Schema.orders]);
//       const {entities, result} = normalized;
//
//       yield put({
//         type: ACTION_TYPES.FETCH_UPCOMING_ORDERS_SUCCESS,
//         entities: entities,
//         result: result,
//         nextPage: (response.links && response.links.next) || null,
//       });
//     }
//   } catch (error) {
//     yield put({type: ACTION_TYPES.FETCH_UPCOMING_ORDERS_FAILURE, error});
//   }
// }

function* fetchCategoriesWithProducts(action) {
  try {

    // const state = yield select();
    // let nextPage;
    // if (action.params.categoryID) {
    //   let {nextPage} = state.customer.categories.products.find(product => product.categoryID === action.params.categoryID);
    //   if (nextPage === null && !action.params.force) {
    //     return yield put({
    //       type: ACTION_TYPES.FETCH_CATEGORIES_WITH_PRODUCTS_FAILURE,
    //       error: I18n.t('no_more_records'),
    //     });
    //   }
    // }
    // const params = {
    //   category_id: action.params.category_id,
    //   paginated: !!nextPage,
    //   paginatedUrl: nextPage,
    // };

    const response = yield call(API.fetchCategoriesWithProducts, action.params);

    // const products = response.products[0];

    // let normalizedCategories = [];
    //
    // const productCategories = Object.keys(products).map(categoryID => {
    //
    //   let productsPaginated = products[categoryID];
    //
    //   normalizedCategories = response.categories.map(category => {
    //     console.log('category',productsPaginated.data);
    //     return {
    //         ...category,
    //         products: productsPaginated.data
    //       }
    //     }
    //   );
    //
    //   console.log('normalizedCategories',normalizedCategories);
    //
    //   return {
    //     categoryID: categoryID,
    //     nextPage: productsPaginated.next_page_url,
    //     collection: productsPaginated.data.map(product => product.id)
    //   }
    // });
    //

    const normalized = normalize(response.categories, [Schema.categories]);
    yield put({
      type: ACTION_TYPES.FETCH_CATEGORIES_WITH_PRODUCTS_SUCCESS,
      entities: normalized.entities,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_CATEGORIES_WITH_PRODUCTS_FAILURE, error});
  }
}

function* fetchCategoryDetails(action) {
  try {
    const response = yield call(API.fetchCategoryDetails, action.params);
    const normalized = normalize(response.data, Schema.categories);
    yield put({
      type: ACTION_TYPES.FETCH_CATEGORY_DETAIL_SUCCESS,
      entities: normalized.entities,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_PRODUCT_DETAIL_FAILURE, error});
  }
}

// Monitoring Sagas
function* fetchCategoriesMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_CATEGORIES_REQUEST, fetchCategories);
}

function* fetchCategoriesWithProductsMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_CATEGORIES_WITH_PRODUCTS_REQUEST, fetchCategoriesWithProducts);
}

function* fetchCategoryDetailsMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_CATEGORY_DETAIL_REQUEST, fetchCategoryDetails);
}

export const sagas = all([fork(fetchCategoriesMonitor), fork(fetchCategoryDetailsMonitor), fork(fetchCategoriesWithProductsMonitor)]);
