import { ICommonResponse } from './common.types';

export interface IGroupDetails {
  group_id: string;
  group_handheld_access: boolean;
  group_management_access: boolean;
  group_module_access: string;
  group_name: string;
  group_description: string;
  group_users: {
    user_color: string;
    user_email: string;
    user_firstname: string;
    user_id: string;
    user_lastname: string;
  }[];
  group_protected: boolean;
  group_account: string;
}

export interface IGroupsListResponse {
  success: string;
  message: string;
  data: Array<IGroupDetails>;
}

export interface IGroupDetailsReponse extends ICommonResponse {
  data: IGroupDetails;
}

export interface IUpdateGroupDetails {
  group_handheld_access?: boolean;
  group_management_access?: boolean;
  group_module_access?: string;
  group_description?: string;
  group_users?: IGroupDetails['group_users'];
}
export interface IUpdateGroupUsers {
  group_users?: string[];
}

export interface ICreateGroupPayload {
  group_handheld_access?: boolean;
  group_management_access?: boolean;
  group_module_access?: string;
  group_name: string;
  group_description: string;
  group_users?: string[];
  group_account: string;
}

export interface ICreateGroupResponse extends ICommonResponse {
  data: IGroupDetails;
}

export interface IUpdateGroupResponse extends ICommonResponse {
  data: boolean;
}
