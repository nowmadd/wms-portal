import axios from 'axios';
import { ENDPOINTS } from '../constants/ENDPOINTS';
import { useAxios } from '../hooks/useAxios';
import {
  IIntegrationDetailsResponse,
  IIntegrationListResponse,
  IShopifyImportOrdersPayload,
  IShopifyIntegrationPayload,
  IShopifyIntegrationResponse,
} from '../types/integrations.types';

export const integrationsDao = () => {
  const { GET, PATCH, DELETE, PUT, POST } = useAxios();

  const getIntegrations = async () => {
    const response = await GET<IIntegrationListResponse>({
      url: `${ENDPOINTS.INTEGRATION}`,
    });
    return response.data;
  };

  const getIntegrationDetails = async (integration_id: string) => {
    const response = await GET<IIntegrationDetailsResponse>({
      url: `${ENDPOINTS.INTEGRATION}/${integration_id}`,
    });
    return response.data;
  };

  const exchangeCodeForToken = async (code: string, shop: string) => {
    const response = await GET<IShopifyIntegrationResponse>({
      url: `${ENDPOINTS.INTEGRATION}/shopify`,
      params: {
        clientId: process.env.REACT_APP_SHOPIFY_CLIENT_ID,
        clientSecret: process.env.REACT_APP_SHOPIFY_CLIENT_SECRET,
        sessionToken: code,
        shopName: shop,
      },
    });

    return response;
  };

  const importOrders = async (params: IShopifyImportOrdersPayload) => {
    const response = await GET<IShopifyIntegrationResponse>({
      url: `${ENDPOINTS.INTEGRATION}/shopify/orders/import`,
      params,
    });

    return response;
  };

  const updateIntegration = async (integration_id: string, data: IShopifyIntegrationPayload) => {
    const response = await PATCH<IShopifyIntegrationResponse>({
      url: `${ENDPOINTS.INTEGRATION}/details/${integration_id}`,
      data,
    });

    return response;
  };

  return {
    updateIntegration,
    importOrders,
    exchangeCodeForToken,
    getIntegrations,
    getIntegrationDetails,
  };
};
