import { ICommonResponse } from './common.types';

export interface IJobDetails {
  job_id: string;
  job_assignment?: string;
  job_order: string;
  job_created: string;
  job_last_updated: string;
  job_meta?: {
    meta_variable_label: string;
    meta_variable_name: string;
    meta_variable_value: string;
    meta_variable_id: string;
  }[];
  job_priority: string;
  job_notes?: string;
  job_status: string;
  job_type: string;
  job_equipment: string;
}

export interface IJobsListDetails {
  job_id: string;
  job_equipment: string;
  job_type: string;
  job_order: string;
  job_status: string;
  job_priority: string;
  job_notes?: string;
  job_created: number;
}

export interface IJobListResponse {
  success: string;
  message: string;
  data: Array<IJobDetails>;
}

export interface IJobDetailsResponse extends ICommonResponse {
  data: IJobDetails;
}

export interface ICreateJobResponse extends ICommonResponse {
  data: boolean;
}

export interface IAddCommentResponse extends ICommonResponse {
  data: boolean;
}

export interface IJobs extends ICommonResponse {
  data: Array<IJobsListDetails>;
}

export interface ICreateJobPayload {
  job_type: string;
  job_status?: string;
  job_priority?: string;
  job_meta: {
    meta_variable_label: string;
    meta_variable_name: string;
    meta_variable_value: string;
    meta_variable_id?: string;
  }[];
  job_notes?: string;
}

export interface IAddCommentPayload {
  comment_content: string;
  comment_author: string;
}

export interface IUpdateJobDetails {
  job_priority?: string;
  job_equipment?: string;
  job_notes?: string;
}

export interface IAddCommentDetails {
  comment_content: string;
  comment_author: string;
}

export const JOBTYPES = {
  pick_pack: 'Pick & Pack',
  move: 'Move',
  planned_pick_pack: 'Pick & Pack',
  planned_pickandpack: 'Pick & Pack',
  planned_move: 'Move',
  planned_stockcheck: 'Stock Check',
  unplanned_stockcheck: 'Stock Check',
  unplanned_move: 'Move',
  unplanned_receipt: 'Receipt',
} as const;
