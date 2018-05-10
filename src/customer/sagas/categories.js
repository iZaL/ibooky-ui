import {all, call, fork, put, takeLatest, select} from 'redux-saga/effects';
import {ACTION_TYPES} from 'customer/common/actions';
import {API} from 'customer/common/api';
import {Schema} from 'utils/schema';
import {normalize} from 'normalizr';
import I18n from 'utils/locale';
import union from 'lodash/union';

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

function* fetchCategoriesWithProducts(action) {
  const {resolve, reject} = action.params;
  try {
    const response = yield call(API.fetchCategoriesWithProducts, action.params);
    const normalized = normalize(response.categories, [Schema.categories]);
    yield put({
      type: ACTION_TYPES.FETCH_CATEGORIES_WITH_PRODUCTS_SUCCESS,
      entities: normalized.entities,
    });
    yield resolve(response.categories);
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_CATEGORIES_WITH_PRODUCTS_FAILURE, error});
    yield reject(error);
  }
}

function* fetchCategoryDetails(action) {
  try {
    const state = yield select();
    let nextPage = undefined;
    let categoryReducerInfo = state.customer.categories.products[action.params.category_id];
    if (categoryReducerInfo) {
      nextPage = categoryReducerInfo.nextPage;
    }
    if (nextPage === null && !action.params.force) {
      return yield put({
        type: ACTION_TYPES.FETCH_CATEGORY_DETAIL_FAILURE,
        error: I18n.t('no_more_records'),
      });
    }
    const params = {
      category_id: action.params.category_id,
      paginated: !!nextPage,
      paginatedUrl: nextPage,
    };
    const response = yield call(API.fetchCategoryDetails, params);
    const products = response.data;
    const category = response.category;
    const productIDs = response.productIDs;

    const normalizedResponse = {
      ...category,
      products: products
    };

    const oldCollection = categoryReducerInfo && categoryReducerInfo.collection || [];

    const productPayload = {
      [category.id]: {
        nextPage: response.links.next,
        collection: union(oldCollection,productIDs)
      }
    };

    const normalized = normalize(normalizedResponse, Schema.categories);
    yield put({
      type: ACTION_TYPES.FETCH_CATEGORY_DETAIL_SUCCESS,
      entities: normalized.entities,
      products: productPayload
    });

  }
  catch(error) {
    yield put({type: ACTION_TYPES.FETCH_CATEGORY_DETAIL_FAILURE, error});
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
