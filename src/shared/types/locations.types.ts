import { ICommonResponse } from './common.types';

export interface ILocationDetails {
  location_id: string;
  location_account: string;
  location_name: string;
  location_type: string;
  location_contents: string[];
  location_inventory: {
    inventory_barcode_primary: string;
    inventory_sku_primary: string;
    inventory_id: string;
    inventory_description: string;
    inventory_stock: {
      unallocated: number;
      allocated: number;
      damaged: number;
    };
  }[];
  location_address?: {
    addr_line1: string;
    addr_line2: string;
    addr_city: string;
    addr_country: string;
    addr_postcode: string;
  };
  location_parent?: {
    parent_id?: string;
    parent_name?: string;
    warehouse?: string;
  };
  location_children?: string[];
  location_size?: {
    gross?: number;
  };
  location_ref?: {
    aisle: string;
    bay: string;
    level: string;
  };
  location_notes?: string;
  location_enabled: boolean;
  location_deleted?: boolean;
  location_created: number;
  location_last_updated: number;
}

export interface ILocationsListResponse {
  success: string;
  message: string;
  data: Array<ILocationDetails>;
}

export interface ILocationDetailsResponse extends ICommonResponse {
  data: ILocationDetails;
}

export interface ICreateLocationResponse extends ICommonResponse {
  data: boolean;
}

export interface IUpdateLocationStatusResponse extends ICommonResponse {
  data: boolean;
}

export interface IUpdateLocationResponse extends ICommonResponse {
  data: boolean;
}

export interface IDeleteLocationResponse extends ICommonResponse {
  data: boolean;
}

export interface IUpdateLocationStatusPayload {
  location_id: string;
  location_enabled: boolean;
}

export interface IUpdateLocationDetails {
  location_name?: string;
  location_address?: {
    addr_line1: string;
    addr_line2: string;
    addr_city: string;
    addr_country: string;
    addr_postcode: string;
  };
  location_children?: string[];
  location_size?: {
    gross?: number;
    width?: number;
    height?: number;
    depth?: number;
  };
  location_ref?: {
    aisle: string;
    bay: string;
    level: string;
  };
  location_notes?: string;
  location_enabled?: boolean;
  location_deleted?: boolean;
}

export interface ICreateLocationPayload {
  location_name: string;
  location_owner?: string;
  location_account?: string;
  location_address?: {
    addr_line1: string;
    addr_line2: string;
    addr_city: string;
    addr_country: string;
    addr_postcode: string;
  };
  location_parent?: {
    warehouse?: string;
  };
  location_ref: {
    aisle: string;
    bay: string;
    level?: string;
  };
  location_type: string;
  location_children?: string[];
  location_size?: {
    gross?: number;
    width?: number;
    height?: number;
    depth?: number;
  };
  location_notes?: string;
  location_enabled: boolean;
}

export interface ICreateWarehouseLocationPayload {
  location_name?: string;
  warehouse_id?: string;
  aisle: string;
  bay: string;
  level?: string | null;
  width?: number;
  height?: number;
  depth?: number;
}

export interface IImportLocationsPayload {
  file_name: string;
  file_size: number;
  file_data: string;
}

export interface IImportBulkLocationsPayload {
  location_references: { aisle: string; bay: string; level: string }[];
  filename: string;
}

export interface IImportBulkLocationResponse extends ICommonResponse {
  data: IImportBulkLocationsPayload;
}
