import {request} from 'utils/network';

function fetchOrders(params = {}) {
  const path = `company/orders/upcoming`;
  return request({path, requiresAuthentication: true, params});
}

function fetchOrderDetails(id) {
  const path = `company/orders/${id}/details`;
  return request({path, requiresAuthentication: true});
}

function scanCode(params) {
  const path = `company/orders/scan`;
  let requestParams = {
    path,
    params,
    method: 'POST',
  };
  return request(requestParams);
}

function redeemCode(params) {
  const path = `company/orders/redeem`;
  let requestParams = {
    path,
    params,
    method: 'POST',
  };
  return request(requestParams);
}

export const API = {
  fetchOrders,
  fetchOrderDetails,
  scanCode,
  redeemCode,
};
