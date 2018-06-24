import {request} from 'utils/network';

function fetchOrders(params = {}) {
  const path = `company/orders/upcoming`;
  return request({path, requiresAuthentication: true, params});
}

function fetchOrderDetails(id) {
  const path = `company/orders/${id}/details`;
  return request({path, requiresAuthentication: true});
}

export const API = {
  fetchOrders,
  fetchOrderDetails,
};
