import { ENDPOINTS } from '../constants/ENDPOINTS';
import { useAxios } from '../hooks/useAxios';
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

export const locationsDao = () => {
  const { GET, PATCH, DELETE, PUT, POST } = useAxios();

  const getLocationsList = async (filterEmptyInventory: boolean) => {
    const response = await GET<ILocationsListResponse>({
      url: `${ENDPOINTS.LOCATIONS}?locationType=location&filterEmptyInventory=${filterEmptyInventory || false}`,
    });
    return response.data;
  };

  const getLocationDetails = async (location_id: string, filterEmptyInventory: boolean) => {
    const response = await GET<ILocationDetailsResponse>({
      url: `${ENDPOINTS.LOCATIONS}/${location_id}?filterEmptyInventory=${filterEmptyInventory || false}`,
    });
    return response.data;
  };

  const deleteLocation = async (location_id: string) => {
    const response = await DELETE<IDeleteLocationResponse>({
      url: `${ENDPOINTS.LOCATIONS}/${location_id}`,
      // data: {
      //   location_deleted: true,
      //   location_owner,
      // },
    });
    return response.data;
  };

  const updateLocationStatus = async (payload: IUpdateLocationStatusPayload) => {
    const response = await PATCH<IUpdateLocationStatusResponse>({
      url: `${ENDPOINTS.LOCATIONS}/${payload.location_id}/status`,
      data: {
        location_enabled: payload.location_enabled,
      },
    });
    return response.data;
  };

  const updateLocationDetails = async (location_id: string, payload: IUpdateLocationDetails) => {
    const response = await PATCH<IUpdateLocationStatusResponse>({
      url: `${ENDPOINTS.LOCATIONS}/${location_id}`,
      data: {
        ...payload,
      },
    });
    return response.data;
  };

  const createLocation = async (payload: ICreateLocationPayload) => {
    const response = await POST<ICreateLocationResponse>({
      url: `${ENDPOINTS.LOCATIONS}`,
      data: {
        ...payload,
      },
    });
    return response.data;
  };

  const verifyImportLocations = async (payload: IImportLocationsPayload[]) => {
    const response = await POST<any>({
      url: `${ENDPOINTS.LOCATIONS}/import`,
      data: payload,
    });
    return response.data;
  };

  const importBulkLocations = async (payload: IImportBulkLocationsPayload) => {
    const response = await POST<any>({
      url: `${ENDPOINTS.LOCATIONS}/bulkcreate`,
      data: payload,
    });
    return response.data;
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
