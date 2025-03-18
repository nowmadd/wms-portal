import { useMutation, useQuery } from 'react-query';
import { IAxiosErrorResponse } from '../types/axios.types';
import {
  IGetOrderDetailsResponse,
  IGetOrdersListResponse,
  IImportBulkOrdersPayload,
  IImportBulkOrdersResponse,
  IImportOrdersPayload,
  IUpdateOrderStatusPayload,
} from '../types/order.types';
import { ordersDao } from '../dao/ordersDao';
import { QUERY } from '../constants/QUERYNAMES';

export const ordersServices = () => {
  const {
    getOrdersList: getOrdersListDao,
    getOrderDetails: getOrderDetailsDao,
    importOrders: importOrdersDao,
    importBulkOrders: importBulkOrdersDao,
    updateOrderStatus: updateOrderStatusDao,
  } = ordersDao();

  const getOrdersList = (params?: { status?: string }) => {
    return useQuery<IGetOrdersListResponse, IAxiosErrorResponse>([QUERY.ORDER_LIST], () => getOrdersListDao(params));
  };

  const getOrderDetails = (order_id: string) => {
    return useQuery<IGetOrderDetailsResponse, IAxiosErrorResponse>(
      [QUERY.ORDER_DETAILS, order_id],
      () => getOrderDetailsDao(order_id),
      {
        enabled: !!order_id,
      },
    );
  };

  const importOrders = () => {
    return useMutation<IImportOrdersPayload, IAxiosErrorResponse, { payload: IImportOrdersPayload[] }>(({ payload }) =>
      importOrdersDao(payload),
    );
  };

  const importBulkOrders = () => {
    return useMutation<IImportBulkOrdersPayload, IAxiosErrorResponse, { payload: IImportBulkOrdersPayload }>(
      ({ payload }) => importBulkOrdersDao(payload),
    );
  };

  const updateOrderStatus = () => {
    return useMutation<
      IUpdateOrderStatusPayload,
      IAxiosErrorResponse,
      { order_id: string; payload: IUpdateOrderStatusPayload }
    >(({ order_id, payload }) => updateOrderStatusDao(order_id, payload));
  };

  return {
    importOrders,
    getOrdersList,
    getOrderDetails,
    importBulkOrders,
    updateOrderStatus,
  };
};
