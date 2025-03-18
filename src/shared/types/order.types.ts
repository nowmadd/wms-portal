import { ICommonResponse } from './common.types';

export interface IOrderDetailsList {
  order_id: string;
  order_ref: string;
  order_customer_name: string;
  order_status: string;
  order_item_count: number;
  order_shipping_method: string;
  order_created: string;
}

export interface IGetOrdersListResponse {
  success: string;
  message: string;
  data: Array<IOrderDetailsList>;
}

export interface IOrderDetails {
  order_status: string;
  order_shipping: {
    shipping_method: string;
    shipping_first_name: string;
    shipping_city: string;
    shipping_address_1: string;
    shipping_last_name: string;
    shipping_county: string;
    shipping_postcode: string;
    shipping_country: string;
  };
  order_created: string;
  order_ref: string;
  order_customer: {
    customer_phone: string;
    customer_email: string;
    customer_name: string;
  };
  order_source: string;
  order_id: string;
  order_items: IOrderItems[];
  order_account: string;
}

export interface IOrderItems {
  item_id: string;
  item_description: string;
  item_barcode_primary: string;
  item_weight: number;
  item_quantity: number;
  item_pick_location: string;
}

export interface IGetOrderDetailsResponse extends ICommonResponse {
  data: IOrderDetails;
}

export interface IImportOrdersPayload {
  file_name: string;
  file_size: number;
  file_data: string;
}

export interface IImportBulkOrdersPayload {
  order_references: string[];
  filename: string;
}

export interface IImportBulkOrdersResponse extends ICommonResponse {
  data: IImportBulkOrdersPayload;
}

export interface IUpdateOrderStatusPayload {
  order_status: string;
}
