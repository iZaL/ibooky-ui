import {all, call, fork, put, takeLatest, select} from 'redux-saga/effects';
import {ACTION_TYPES} from 'customer/common/actions';
import {API} from 'customer/common/api';
import {Schema} from 'utils/schema';
import {normalize} from 'normalizr';
import I18n from 'utils/locale';
import union from 'lodash/union';

function* fetchProductDetails(action) {
  try {
    const response = yield call(API.fetchProductDetails, action.params);
    const normalized = normalize(response.data, Schema.products);
    yield put({
      type: ACTION_TYPES.FETCH_PRODUCT_DETAIL_SUCCESS,
      entities: normalized.entities,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_PRODUCT_DETAIL_FAILURE, error});
  }
}

function* fetchProducts(action) {
  try {
    const response = yield call(API.fetchProducts, action.params);
    const normalized = normalize(response.data, [Schema.products]);
    yield put({
      type: ACTION_TYPES.FETCH_PRODUCTS_SUCCESS,
      entities: normalized.entities,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_PRODUCTS_FAILURE, error});
  }
}

function* productSearch(action) {
  try {
    const state = yield select();
    let nextPage = undefined;
    let searchReducer = state.customer.search;

    if (searchReducer) {
      nextPage = searchReducer.nextPage;
    }

    const params = {
      paginated: !!nextPage,
      paginatedUrl: nextPage,
      query:`term=${action.params.term}`
    };

    const response = yield call(API.searchProducts, params);
    const products = response.data;
    const productIDs = response.productIDs;

    const productPayload = {
      nextPage: response.links.next,
      collection: productIDs,
    };

    const normalized = normalize(products, [Schema.products]);

    yield put({
      type: ACTION_TYPES.PRODUCT_SEARCH_SUCCESS,
      entities: normalized.entities,
      products: productPayload,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.PRODUCT_SEARCH_FAILURE, error});
  }
}

function* fetchFavoriteProducts(action) {
  try {
    const state = yield select();
    let nextPage = undefined;
    let favoritesReducer = state.customer.favorites;

    if (favoritesReducer) {
      nextPage = favoritesReducer.nextPage;
    }

    if (nextPage === null && !action.params.force) {
      return yield put({
        type: ACTION_TYPES.FETCH_FAVORITE_PRODUCTS_FAILURE,
        error: I18n.t('no_more_records'),
      });
    }

    const params = {
      paginated: !!nextPage,
      paginatedUrl: nextPage,
    };

    const response = yield call(API.fetchFavoriteProducts, params);
    const products = response.data;
    const productIDs = response.productIDs;

    const oldCollection =
      (favoritesReducer && favoritesReducer.collection) || [];

    const productPayload = {
      nextPage: response.links.next,
      collection: union(oldCollection, productIDs),
    };

    const normalized = normalize(products, [Schema.products]);

    yield put({
      type: ACTION_TYPES.FETCH_FAVORITE_PRODUCTS_SUCCESS,
      entities: normalized.entities,
      products: productPayload,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_FAVORITE_PRODUCTS_FAILURE, error});
  }
}


function* favoriteProduct(action) {
  try {
    const params = {
      body: {
        ...action.params,
      },
    };
    const response = yield call(API.favoriteProduct, params);
    const normalized = normalize(response.data, Schema.products);

    yield put({
      type: ACTION_TYPES.PRODUCT_FAVORITE_SUCCESS,
      entities: normalized.entities,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.PRODUCT_FAVORITE_FAILURE, error});
  }
}

function* fetchProductDetailsMonitor() {
  yield takeLatest(
    ACTION_TYPES.FETCH_PRODUCT_DETAIL_REQUEST,
    fetchProductDetails,
  );
}
function* fetchFavoriteProductsMonitor() {
  yield takeLatest(
    ACTION_TYPES.FETCH_FAVORITE_PRODUCTS_REQUEST,
    fetchFavoriteProducts,
  );
}

function* favoriteProductMonitor() {
  yield takeLatest(ACTION_TYPES.PRODUCT_FAVORITE_REQUEST, favoriteProduct);
}
function* productSearchMonitor() {
  yield takeLatest(ACTION_TYPES.PRODUCT_SEARCH_REQUEST, productSearch);
}

function* fetchProductsMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_PRODUCTS_REQUEST, fetchProducts);
}

export const sagas = all([
  fork(fetchProductDetailsMonitor),
  fork(fetchFavoriteProductsMonitor),
  fork(favoriteProductMonitor),
  fork(productSearchMonitor),
  fork(fetchProductsMonitor),
]);
