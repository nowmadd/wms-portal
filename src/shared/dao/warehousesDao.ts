import { ENDPOINTS } from '../constants/ENDPOINTS';
import { useAxios } from '../hooks/useAxios';
import {
  ICreateWarehousePayload,
  ICreateWarehouseResponse,
  IDeleteWarehouseResponse,
  IWarehouseDetailsReponse,
  IWarehousesListResponse,
  IUpdateWarehouseDetails,
  IUpdateWarehouseStatusPayload,
  IUpdateWarehouseStatusResponse,
  IAddWarehouseClosureResponse,
  IAddWarehouseClosureRequest,
  IPrintBarcodeResponse,
  IRemoveWarehouseClosureResponse,
} from '../types/warehouse.types';

export const warehousesDao = () => {
  const { GET, PATCH, DELETE, PUT, POST } = useAxios();

  const getWarehousesList = async () => {
    const response = await GET<IWarehousesListResponse>({
      // url: `${ENDPOINTS.LOCATIONS}?locationType=warehouse`,
      //based on PRCLD-2067
      url: `${ENDPOINTS.LOCATIONS}?locationType=location`,
    });
    return response.data;
  };

  const getWarehouseDetails = async (location_id: string) => {
    const response = await GET<IWarehouseDetailsReponse>({
      url: `${ENDPOINTS.LOCATIONS}/${location_id}`,
    });
    return response.data;
  };

  const deleteWarehouse = async (location_id: string, location_owner: string) => {
    const response = await DELETE<IDeleteWarehouseResponse>({
      url: `${ENDPOINTS.LOCATIONS}/${location_id}`,
      data: {
        location_deleted: true,
        location_owner,
      },
    });
    return response.data;
  };

  const updateWarehouseStatus = async (payload: IUpdateWarehouseStatusPayload) => {
    const response = await PATCH<IUpdateWarehouseStatusResponse>({
      url: `${ENDPOINTS.LOCATIONS}/${payload.location_id}/status`,
      data: {
        location_enabled: payload.location_enabled,
      },
    });
    return response.data;
  };

  const updateWarehouseDetails = async (location_id: string, payload: IUpdateWarehouseDetails) => {
    const response = await PATCH<IUpdateWarehouseStatusResponse>({
      url: `${ENDPOINTS.LOCATIONS}/${location_id}`,
      data: {
        ...payload,
      },
    });
    return response.data;
  };

  const createWarehouse = async (payload: ICreateWarehousePayload) => {
    const response = await POST<ICreateWarehouseResponse>({
      url: `${ENDPOINTS.LOCATIONS}`,
      data: {
        ...payload,
      },
    });
    return response.data;
  };

  const addWarehouseClosure = async (location_id: string, payload: IAddWarehouseClosureRequest) => {
    const response = await POST<IAddWarehouseClosureResponse>({
      url: `${ENDPOINTS.LOCATIONS}/${location_id}/closure`,
      data: {
        ...payload,
      },
    });
    return response.data;
  };

  const printBarcode = async (location_id: string) => {
    const response = await POST<IPrintBarcodeResponse>({
      url: `${ENDPOINTS.LOCATIONS}/${location_id}/printbarcode`,
    });
    return response.data;
  };

  const removeWarehouseClosure = async (location_id: string, closure_id: string) => {
    const response = await DELETE<IRemoveWarehouseClosureResponse>({
      url: `${ENDPOINTS.LOCATIONS}/${location_id}/closure/${closure_id}`,
    });
    return response.data;
  };

  return {
    createWarehouse,
    updateWarehouseDetails,
    deleteWarehouse,
    updateWarehouseStatus,
    getWarehousesList,
    getWarehouseDetails,
    addWarehouseClosure,
    printBarcode,
    removeWarehouseClosure,
  };
};
