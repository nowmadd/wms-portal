import { ICommonResponse } from './common.types';

export interface IWarehouseDetails {
  location_id: string;
  location_account: string;
  location_name: string;
  location_type: string;
  location_address?: {
    addr_line1: string;
    addr_line2: string;
    addr_city: string;
    addr_country: string;
    addr_postcode: string;
  };
  location_parent?: string;
  location_children?: {
    location_id: string;
    location_name: string;
  }[];
  location_size: {
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
  location_opening_hours: {
    monday: { start: string; end: string };
    tuesday: { start: string; end: string };
    wednesday: { start: string; end: string };
    thursday: { start: string; end: string };
    friday: { start: string; end: string };
    saturday: { start: string; end: string };
    sunday: { start: string; end: string };
  };
  location_closures: IWarehouseClosureDetails[];
}

export interface IWarehousesListResponse {
  success: string;
  message: string;
  data: Array<IWarehouseDetails>;
}

export interface IWarehouseDetailsReponse extends ICommonResponse {
  data: IWarehouseDetails;
}

export interface ICreateWarehouseResponse extends ICommonResponse {
  data: boolean;
}

export interface IUpdateWarehouseStatusResponse extends ICommonResponse {
  data: boolean;
}

export interface IUpdateWarehouseResponse extends ICommonResponse {
  data: boolean;
}

export interface IDeleteWarehouseResponse extends ICommonResponse {
  data: boolean;
}

export interface IUpdateWarehouseStatusPayload {
  location_id: string;
  location_enabled: boolean;
}

export interface IUpdateWarehouseDetails {
  location_name?: string;
  location_address?: {
    addr_line1: string;
    addr_line2: string;
    addr_city: string;
    addr_country: string;
    addr_postcode: string;
  };
  location_children?: {
    location_id: string;
    location_name: string;
  }[];
  location_size: {
    gross?: number;
  };
  location_ref?: {
    aisle: string;
    bay: string;
    level: string;
  };
  location_notes?: string;
  location_enabled?: boolean;
  location_deleted?: boolean;
  location_opening_hours?: any;
}

export interface ICreateWarehousePayload {
  location_name: string;
  location_owner?: string;
  location_account?: string;
  location_address: {
    addr_line1: string;
    addr_line2: string;
    addr_city: string;
    addr_country: string;
    addr_postcode: string;
  };
  location_type: string;
  location_children?: string[];
  location_size: {
    gross?: number;
  };
  location_notes: string;
  location_enabled: boolean;
}

export interface IAddWarehouseClosureResponse {
  success: string;
  message: string;
}

export interface IRemoveWarehouseClosureResponse {
  success: string;
  message: string;
}

export interface IAddWarehouseClosureRequest {
  closure_id?: string;
  closure_description: string;
  closure_closed: boolean;
  closure_date?: number;
  closure_start?: string;
  closure_end?: string;
}

export interface IPrintBarcodeRequest {
  location_account: string;
  location_id: string;
}

export interface IPrintBarcodeResponse extends ICommonResponse {
  data: {
    uri: string;
  };
}

export interface IDeleteWarehouseResponse extends ICommonResponse {
  data: boolean;
}

export interface IWarehouseClosureDetails {
  closure_id: string;
  closure_description: string;
  closure_closed: boolean;
  closure_date: number;
  closure_start: string;
  closure_end: string;
}
