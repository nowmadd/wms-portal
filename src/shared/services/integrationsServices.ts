import { useMutation, useQuery } from 'react-query';
import { IAxiosErrorResponse } from '../types/axios.types';
import { integrationsDao } from '../dao/integrationsDao';
import { QUERY } from '../constants/QUERYNAMES';
import {
  IIntegrationDetails,
  IIntegrationDetailsResponse,
  IIntegrationListResponse,
  IShopifyIntegrationPayload,
} from '../types/integrations.types';

export const integrationsServices = () => {
  const {
    getIntegrations: getIntegrationsDao,
    importOrders: importOrdersDao,
    getIntegrationDetails: getIntegrationDetailsDao,
    exchangeCodeForToken: exchangeCodeForTokenDao,
    updateIntegration: updateIntegrationDao,
  } = integrationsDao();

  const getIntegrations = () => {
    return useQuery<IIntegrationListResponse, IAxiosErrorResponse>([QUERY.INTEGRATION_DATA_LIST], () =>
      getIntegrationsDao(),
    );
  };

  const getIntegrationDetails = (integration_id: string) => {
    return useQuery<IIntegrationDetailsResponse, IAxiosErrorResponse>([QUERY.INTEGRATION_DATA_DETAILS], () =>
      getIntegrationDetailsDao(integration_id),
    );
  };

  const exchangeCodeForToken = () => {
    return useMutation((payload: { code: string; shop: string }) =>
      exchangeCodeForTokenDao(payload.code, payload.shop),
    );
  };

  const importOrders = () => {
    return useMutation((payload: { clientId: string; clientSecret: string; shopName: string; sessiontoken: string }) =>
      importOrdersDao(payload),
    );
  };

  const updateIntegration = () => {
    return useMutation((payload: { integration_id: string; data: IShopifyIntegrationPayload }) =>
      updateIntegrationDao(payload.integration_id, payload.data),
    );
  };

  return {
    updateIntegration,
    importOrders,
    exchangeCodeForToken,
    getIntegrations,
    getIntegrationDetails,
  };
};
