import { ICommonResponse } from './common.types';

export interface ICreateInventoryItemPayload {
  inventory_type: 'item' | 'packaging';
  inventory_description: string;
  inventory_barcode_primary: string;
  inventory_sku_primary?: string;
  inventory_barcode_alt?: string;
  inventory_parent_warehouse?: string;
  inventory_parent_location_preferred?: string;
  inventory_parent_location_overflow?: string[];
  inventory_net_weight: number;
  inventory_start_quantity: number;
  inventory_unit_size: number;
}

export interface IInventoryColumnDetails {
  inventory_barcode_primary: string;
  inventory_sku_primary: string;
  inventory_id: string;
  inventory_description: string;
  inventory_locations: string[];
  inventory_stock: {
    unallocated: number;
    allocated: number;
  };
}

export interface IGetInventoryListsResponse {
  success: string;
  message: string;
  data: Array<IInventoryColumnDetails>;
}

export interface IInventoryDetails {
  inventory_barcode_primary: string;
  inventory_sku_primary: string;
  inventory_net_weight: number;
  inventory_description: string;
  inventory_unit_size: number;
  inventory_barcode_alt: string;
  inventory_created: number;
  inventory_stock: [
    {
      stock: {
        stock_damaged: number;
        stock_unallocated: number;
        stock_allocated: number;
      };
      location_id: string;
    },
  ];
  inventory_warehouse: string;
  inventory_locations_overflow: string[];
  inventory_locations_preferred: string;
}

export interface IGetInventoryItemResponse {
  success: string;
  message: string;
  data: IInventoryDetails;
}

export interface IUpdateInventoryDetails {
  inventory_description?: string;
  inventory_barcode_primary?: string;
  inventory_sku_primary?: string;
  inventory_barcode_alt?: string;
  inventory_net_weight?: number;
  inventory_unit_size?: number;
}

export interface IUpdateInventoryDetailsResponse extends ICommonResponse {
  data: boolean;
}
