import { useMutation, useQuery } from 'react-query';
import { IAxiosErrorResponse } from '../types/axios.types';
import { warehousesDao } from '../dao/warehousesDao';
import {
  ICreateWarehousePayload,
  IDeleteWarehouseResponse,
  IWarehouseDetails,
  IWarehouseDetailsReponse,
  IWarehousesListResponse,
  IUpdateWarehouseDetails,
  IUpdateWarehouseStatusPayload,
  IUpdateWarehouseStatusResponse,
  IAddWarehouseClosureResponse,
  IAddWarehouseClosureRequest,
  IPrintBarcodeResponse,
} from '../types/warehouse.types';
import { QUERY } from '../constants/QUERYNAMES';

export const warehousesServices = () => {
  const {
    getWarehousesList: getWarehousesListDao,
    getWarehouseDetails: getWarehouseDetailsDao,
    updateWarehouseStatus: updateWarehouseStatusDao,
    deleteWarehouse: deleteWarehouseDao,
    updateWarehouseDetails: updateWarehouseDetailsDao,
    createWarehouse: createWarehouseDao,
    addWarehouseClosure: addWarehouseClosureDao,
    printBarcode: printBarcodeDao,
    removeWarehouseClosure: removeWarehouseClosureDao,
  } = warehousesDao();

  const getWarehousesList = () => {
    return useQuery<IWarehousesListResponse, IAxiosErrorResponse>([QUERY.WAREHOUSE_LIST], () => getWarehousesListDao());
  };

  const getWarehouseDetails = (location_id: string) => {
    return useQuery<IWarehouseDetailsReponse, IAxiosErrorResponse>([QUERY.WAREHOUSE_DETAILS, location_id], () =>
      getWarehouseDetailsDao(location_id),
    );
  };

  const updateWarehouseStatus = () => {
    return useMutation<IUpdateWarehouseStatusResponse, IAxiosErrorResponse, { payload: IUpdateWarehouseStatusPayload }>(
      ({ payload }) => updateWarehouseStatusDao(payload),
    );
  };

  const updateWarehouseDetails = () => {
    return useMutation<
      IUpdateWarehouseStatusResponse,
      IAxiosErrorResponse,
      { location_id: string; payload: IUpdateWarehouseDetails }
    >(({ location_id, payload }) => updateWarehouseDetailsDao(location_id, payload));
  };

  const deleteWarehouse = () => {
    return useMutation<IDeleteWarehouseResponse, IAxiosErrorResponse, { location_id: string; location_owner: string }>(
      ({ location_id, location_owner }) => deleteWarehouseDao(location_id, location_owner),
    );
  };

  const createWarehouse = () => {
    return useMutation<IUpdateWarehouseStatusResponse, IAxiosErrorResponse, { payload: ICreateWarehousePayload }>(
      ({ payload }) => createWarehouseDao(payload),
    );
  };

  const addWarehouseClosure = () => {
    return useMutation<
      IAddWarehouseClosureResponse,
      IAxiosErrorResponse,
      { location_id: string; payload: IAddWarehouseClosureRequest }
    >(({ location_id, payload }) => addWarehouseClosureDao(location_id, payload));
  };

  const printBarcode = () => {
    return useMutation<IPrintBarcodeResponse, IAxiosErrorResponse, { location_id: string }>(({ location_id }) =>
      printBarcodeDao(location_id),
    );
  };

  const removeWarehouseClosure = () => {
    return useMutation<IDeleteWarehouseResponse, IAxiosErrorResponse, { location_id: string; closure_id: string }>(
      ({ location_id, closure_id }) => removeWarehouseClosureDao(location_id, closure_id),
    );
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
