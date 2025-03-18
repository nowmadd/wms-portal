import { ENDPOINTS } from '../constants/ENDPOINTS';
import { useAxios } from '../hooks/useAxios';
import {
  ICreateGroupPayload,
  ICreateGroupResponse,
  IGroupDetailsReponse,
  IGroupsListResponse,
  IUpdateGroupDetails,
  IUpdateGroupResponse,
  IUpdateGroupUsers,
} from '../types/groups.types';

export const groupsDao = () => {
  const { GET, PATCH, DELETE, PUT, POST } = useAxios();

  const getGroupsList = async () => {
    const response = await GET<IGroupsListResponse>({
      url: `${ENDPOINTS.GROUPS}`,
    });
    return response.data;
  };

  const getGroupDetails = async (group_id: string) => {
    const response = await GET<IGroupDetailsReponse>({
      url: `${ENDPOINTS.GROUPS}/${group_id}`,
    });
    return response.data;
  };

  const createGroup = async (payload: ICreateGroupPayload) => {
    const response = await POST<ICreateGroupResponse>({
      url: `${ENDPOINTS.GROUPS}`,
      data: {
        ...payload,
      },
    });
    return response.data;
  };

  const updateGroup = async (group_id: string, payload: IUpdateGroupDetails) => {
    const response = await PATCH<IUpdateGroupResponse>({
      url: `${ENDPOINTS.GROUPS}/${group_id}`,
      data: payload,
    });
    return response.data;
  };

  const addUsersToGroup = async (group_id: string, payload: IUpdateGroupUsers) => {
    const response = await POST<IUpdateGroupResponse>({
      url: `${ENDPOINTS.GROUPS}/${group_id}/members`,
      data: payload,
    });
    return response.data;
  };

  const removeUsersFromGroup = async (group_id: string, payload: IUpdateGroupUsers) => {
    const response = await DELETE<IUpdateGroupResponse>({
      url: `${ENDPOINTS.GROUPS}/${group_id}/members`,
      data: payload,
    });
    return response.data;
  };

  return {
    createGroup,
    getGroupsList,
    getGroupDetails,
    updateGroup,
    addUsersToGroup,
    removeUsersFromGroup,
  };
};
