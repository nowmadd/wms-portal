import { ENDPOINTS } from '../constants/ENDPOINTS';
import { useAxios } from '../hooks/useAxios';
import { ICommonResponse } from '../types/common.types';
import {
  ICreateInventoryItemPayload,
  IGetInventoryListsResponse,
  IGetInventoryItemResponse,
  IUpdateInventoryDetails,
  IUpdateInventoryDetailsResponse,
} from '../types/inventory.types';

export const inventoryDao = () => {
  const { GET, PATCH, DELETE, PUT, POST } = useAxios();

  const createInventory = async (payload: ICreateInventoryItemPayload) => {
    const response = await POST<ICommonResponse>({
      url: `${ENDPOINTS.INVENTORY}`,
      data: {
        ...payload,
      },
    });
    return response.data;
  };

  const getInventoryList = async () => {
    const response = await GET<IGetInventoryListsResponse>({
      url: `${ENDPOINTS.INVENTORY}?inventoryType=item`,
    });
    return response.data;
  };

  const getInventoryItem = async (inventoryId: string) => {
    const response = await GET<IGetInventoryItemResponse>({
      url: `${ENDPOINTS.INVENTORY}/${inventoryId}`,
    });
    return response.data;
  };

  const updateInventoryDetails = async (inventory_id: string, payload: IUpdateInventoryDetails) => {
    const response = await PATCH<IUpdateInventoryDetailsResponse>({
      url: `${ENDPOINTS.INVENTORY}/${inventory_id}`,
      data: {
        ...payload,
      },
    });
    return response.data;
  };

  return {
    createInventory,
    getInventoryList,
    getInventoryItem,
    updateInventoryDetails,
  };
};
