import { ICommonResponse } from './common.types';

export interface IActivityDetails {
  activity_id: string;
  activity_status: string;
  activity_performed_action_title: string;
  activity_description: string;
  activity_performed_by: string;
  activity_read_only: boolean;
  activity_timestamp: string;
}

export interface IActivityListResponse {
  success: string;
  message: string;
  data: Array<IActivityDetails>;
}
