import { useMutation, useQuery } from 'react-query';
import { IAxiosErrorResponse } from '../types/axios.types';
import { locationsDao } from '../dao/locationsDao';
import {
  ICreateLocationPayload,
  ICreateLocationResponse,
  IDeleteLocationResponse,
  IImportBulkLocationsPayload,
  IImportLocationsPayload,
  ILocationDetailsResponse,
  ILocationsListResponse,
  IUpdateLocationDetails,
  IUpdateLocationStatusPayload,
  IUpdateLocationStatusResponse,
} from '../types/locations.types';
import { QUERY } from '../constants/QUERYNAMES';

export const locationsServices = () => {
  const {
    getLocationsList: getLocationsListDao,
    getLocationDetails: getLocationDetailsDao,
    updateLocationStatus: updateLocationStatusDao,
    deleteLocation: deleteLocationDao,
    updateLocationDetails: updateLocationDetailsDao,
    createLocation: createLocationDao,
    verifyImportLocations: verifyImportLocationsDao,
    importBulkLocations: importBulkLocationsDao,
  } = locationsDao();

  const getLocationsList = (filterEmptyInventory: boolean) => {
    return useQuery<ILocationsListResponse, IAxiosErrorResponse>([QUERY.LOCATION_LIST], () =>
      getLocationsListDao(filterEmptyInventory),
    );
  };

  const getLocationDetails = (location_id: string, filterEmptyInventory: boolean) => {
    return useQuery<ILocationDetailsResponse, IAxiosErrorResponse>([QUERY.LOCATION_DETAILS, location_id], () =>
      getLocationDetailsDao(location_id, filterEmptyInventory),
    );
  };

  const updateLocationStatus = () => {
    return useMutation<IUpdateLocationStatusResponse, IAxiosErrorResponse, { payload: IUpdateLocationStatusPayload }>(
      ({ payload }) => updateLocationStatusDao(payload),
    );
  };
  const updateLocationDetails = () => {
    return useMutation<
      IUpdateLocationStatusResponse,
      IAxiosErrorResponse,
      { location_id: string; payload: IUpdateLocationDetails }
    >(({ location_id, payload }) => updateLocationDetailsDao(location_id, payload));
  };

  const deleteLocation = () => {
    return useMutation<IDeleteLocationResponse, IAxiosErrorResponse, { location_id: string }>(({ location_id }) =>
      deleteLocationDao(location_id),
    );
  };
  const createLocation = () => {
    return useMutation<IUpdateLocationStatusResponse, IAxiosErrorResponse, { payload: ICreateLocationPayload }>(
      ({ payload }) => createLocationDao(payload),
    );
  };

  const verifyImportLocations = () => {
    return useMutation<IImportLocationsPayload, IAxiosErrorResponse, { payload: IImportLocationsPayload[] }>(
      ({ payload }) => verifyImportLocationsDao(payload),
    );
  };

  const importBulkLocations = () => {
    return useMutation<IImportBulkLocationsPayload, IAxiosErrorResponse, { payload: IImportBulkLocationsPayload }>(
      ({ payload }) => importBulkLocationsDao(payload),
    );
  };

  return {
    createLocation,
    updateLocationDetails,
    deleteLocation,
    updateLocationStatus,
    getLocationsList,
    getLocationDetails,
    verifyImportLocations,
    importBulkLocations,
  };
};
