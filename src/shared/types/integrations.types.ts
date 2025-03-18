import { ICommonResponse } from './common.types';

export interface IIntegrationDetails {
  integration_data_id: string;
  integration_data_name: string;
  integration_data_tags: string[];
  integration_data_color: string;
  integration_data_description: string;
  integration_data_active: boolean;
  integration_data_enabled: boolean;
  integration_data_image: string;
}

export interface IIntegrationAccountDetails {
  integration_ref: string;
  integration_type: string;
  integration_config: {};
  integration_id: string;
  integration_details: {
    shop_domain: string;
    shop_last_updated: string;
    shop_id: string;
    shop_created: string;
    shop_name: string;
  };
  integration_keys: {};
  integration_created: number;
  integration_source: IIntegrationDetails;
}

export interface IIntegrationListResponse {
  success: string;
  message: string;
  data: Array<IIntegrationDetails>;
}

export interface IIntegrationDetailsResponse extends ICommonResponse {
  data: IIntegrationAccountDetails;
}

export interface IShopifyIntegrationResponse extends ICommonResponse {
  data: {
    createdAt: string;
    id: string;
    myshopifyDomain: string;
    name: string;
    updatedAt: string;
  };
  message: string;
  success: boolean;
}

export interface IShopifyImportOrdersPayload {
  clientId: string;
  clientSecret: string;
  shopName: string;
  sessiontoken: string;
}

export interface IShopifyIntegrationPayload {
  shop_linked_warehouse: string;
  shop_linked_location: string;
}
