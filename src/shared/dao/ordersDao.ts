import { ENDPOINTS } from '../constants/ENDPOINTS';
import { useAxios } from '../hooks/useAxios';
import {
  IGetOrdersListResponse,
  IGetOrderDetailsResponse,
  IImportOrdersPayload,
  IImportBulkOrdersPayload,
  IUpdateOrderStatusPayload,
} from '../types/order.types';

export const ordersDao = () => {
  const { GET, PATCH, DELETE, PUT, POST } = useAxios();

  const getOrdersList = async (params?: { status?: string }) => {
    const response = await GET<IGetOrdersListResponse>({
      url: `${ENDPOINTS.ORDERS}`,
      //add path params
      params,
    });
    return response.data;
  };

  const getOrderDetails = async (order_id: string) => {
    const response = await GET<IGetOrderDetailsResponse>({
      url: `${ENDPOINTS.ORDERS}/${order_id}`,
    });
    return response.data;
  };

  const importOrders = async (payload: IImportOrdersPayload[]) => {
    const response = await POST<any>({
      url: `${ENDPOINTS.ORDERS}/import`,
      data: payload,
    });
    return response.data;
  };

  const importBulkOrders = async (payload: IImportBulkOrdersPayload) => {
    const response = await POST<any>({
      url: `${ENDPOINTS.ORDERS}/bulkcreate`,
      data: payload,
    });
    return response.data;
  };

  const updateOrderStatus = async (order_id: string, payload: IUpdateOrderStatusPayload) => {
    const response = await POST<any>({
      url: `${ENDPOINTS.ORDERS}/${order_id}/status`,
      data: payload,
    });
    return response.data;
  };

  return {
    importOrders,
    getOrdersList,
    getOrderDetails,
    importBulkOrders,
    updateOrderStatus,
  };
};
