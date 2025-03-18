import { useMutation, useQuery } from 'react-query';
import { IAxiosErrorResponse } from '../types/axios.types';
import { inventoryDao } from '../dao/inventoryDao';
import {
  ICreateInventoryItemPayload,
  IGetInventoryListsResponse,
  IGetInventoryItemResponse,
  IUpdateInventoryDetailsResponse,
  IUpdateInventoryDetails,
} from '../types/inventory.types';
import { ICommonResponse } from '../types/common.types';
import { QUERY } from '../constants/QUERYNAMES';

export const inventoryServices = () => {
  const {
    createInventory: createInventoryDao,
    getInventoryList: getInventoryListDao,
    getInventoryItem: getInventoryItemDao,
    updateInventoryDetails: updateInventoryDetailsDao,
  } = inventoryDao();

  const createInventory = () => {
    return useMutation<ICommonResponse, IAxiosErrorResponse, { payload: ICreateInventoryItemPayload }>(({ payload }) =>
      createInventoryDao(payload),
    );
  };

  const getInventoryList = () => {
    return useQuery<IGetInventoryListsResponse, IAxiosErrorResponse>([QUERY.INVENTORY_LIST], () =>
      getInventoryListDao(),
    );
  };

  const getInventoryDetails = (inventory_id: string) => {
    return useQuery<IGetInventoryItemResponse, IAxiosErrorResponse>([QUERY.INVENTORY_DETAILS, inventory_id], () =>
      getInventoryItemDao(inventory_id),
    );
  };

  const updateInventoryDetails = () => {
    return useMutation<
      IUpdateInventoryDetailsResponse,
      IAxiosErrorResponse,
      { inventory_id: string; payload: IUpdateInventoryDetails }
    >(({ inventory_id, payload }) => updateInventoryDetailsDao(inventory_id, payload));
  };

  return {
    createInventory,
    getInventoryList,
    getInventoryDetails,
    updateInventoryDetails,
  };
};
